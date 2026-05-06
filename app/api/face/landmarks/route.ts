import { NextRequest, NextResponse } from "next/server";
import {
  LandmarksResponse,
  CONFIDENCE_THRESHOLD,
  MAX_FILE_SIZE,
  PerfectCorpResponse,
} from "@/lib/types";
import { generateUploadId, saveUpload, getUploadMetadata } from "@/lib/storage";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



async function uploadToCloudinary(imageBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!process.env.CLOUD_NAME) {
      return reject(new Error("Missing Cloudinary credentials in .env"));
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "perfectFace",
        transformation: [
          { width: 2048, height: 2048, crop: "limit", quality: "auto", fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );
    uploadStream.end(imageBuffer);
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function callPerfectCorpAPI(
  imageBuffer: Buffer,
  signal?: AbortSignal
): Promise<PerfectCorpResponse | null> {
  const apiKey = process.env.PERFECTCORP_API_KEY;
  // Use the correct Skin Analysis endpoint
  const baseUrl = "https://yce-api-01.makeupar.com/s2s/v2.1/task/skin-analysis";
  const useMock = process.env.USE_MOCK_LANDMARKS === "true";

  if (!apiKey) {
    console.error("Missing Perfect Corp credentials");
    return null;
  }

  try {
    console.log("1. Uploading image to Cloudinary...");
    const cloudinaryUrl = await uploadToCloudinary(imageBuffer);
    console.log("Cloudinary Upload Success:", cloudinaryUrl);

    console.log("2. Starting Perfect Corp Task...");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const initBody = JSON.stringify({
      src_file_url: cloudinaryUrl,
      format: "json",
      dst_actions: [
        "acne",
        "droopy_lower_eyelid",
        "eye_bag",
        "moisture",
        "firmness",
        "oiliness",
        "radiance"
      ],
    });

    const startRes = await fetch(baseUrl, {
      method: "POST",
      headers,
      body: initBody,
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000),
    });

    if (!startRes.ok) {
      console.error("Perfect Corp API Start Error:", startRes.status, await startRes.text());
      return null;
    }

    const startJson = await startRes.json();
    const taskId = startJson?.data?.task_id;

    if (!taskId) {
      console.error("task_id not found in response:", startJson);
      return null;
    }

    console.log("3. Polling Perfect Corp Task ID:", taskId);
    for (let attempt = 1; attempt <= 30; attempt++) {
      const pollUrl = `${baseUrl}/${encodeURIComponent(taskId)}`;
      const pollRes = await fetch(pollUrl, {
        method: "GET",
        headers,
        signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000),
      });

      if (!pollRes.ok) throw new Error(`Polling failed: ${pollRes.status}`);

      const pollJson = await pollRes.json();
      const taskStatus = pollJson?.data?.task_status;
      console.log(`[Attempt ${attempt}] Status:`, taskStatus);

      if (taskStatus === "success") {
        // We attempt to map their asynchronous response back to our expected shape
        // Note: The exact shape depends on their endpoint. If it's different, it might crash here.
        // We will pass the full results to the frontend.
        return pollJson.data.results || pollJson;
      }
      if (taskStatus === "error") {
        throw new Error(`Task failed: ${JSON.stringify(pollJson)}`);
      }

      await sleep(2000);
    }

    throw new Error("Max polling attempts exceeded");
  } catch (error) {
    console.error("Perfect Corp API call failed:", error);
    return null;
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<LandmarksResponse>> {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_FILE",
          message: "No file provided or invalid file format",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      const maxMB = (MAX_FILE_SIZE / 1024 / 1024).toFixed(0);
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_FILE",
          message: `File too large. Max size: ${maxMB}MB`,
        },
        { status: 400 }
      );
    }

    const contentType = file.type.toLowerCase();
    if (!["image/jpeg", "image/png"].includes(contentType)) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_FILE",
          message: "File must be JPG or PNG",
        },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    const perfectCorpResponse = await callPerfectCorpAPI(imageBuffer, req.signal);

    if (!perfectCorpResponse) {
      return NextResponse.json(
        {
          ok: false,
          code: "UPSTREAM_ERROR",
          message: "Failed to process image with face detection service",
        },
        { status: 500 }
      );
    }

    // Now pivoting to Skin Analysis / Skincare Product Recommendation!
    // The perfectCorpResponse contains the AI output for acne, oiliness, etc.
    console.log("=== RAW API RESPONSE FROM PERFECT CORP ===");
    console.dir(perfectCorpResponse, { depth: null });

    if (perfectCorpResponse.error) {
      return NextResponse.json(
        {
          ok: false,
          code: "UPSTREAM_ERROR",
          message: perfectCorpResponse.error,
        },
        { status: 500 }
      );
    }

    // Try to extract the output array from the response
    let skinData = null;
    if (perfectCorpResponse.output) skinData = perfectCorpResponse.output;
    else if (perfectCorpResponse.results && perfectCorpResponse.results.output) skinData = perfectCorpResponse.results.output;
    else if (Array.isArray(perfectCorpResponse)) skinData = perfectCorpResponse;
    else skinData = perfectCorpResponse; // Send the whole thing if we can't find .output

    return NextResponse.json({
      ok: true,
      data: {
        skinAnalysis: skinData
      },
    });
  } catch (error) {
    console.error("Landmarks API error:", error);
    return NextResponse.json(
      {
        ok: false,
        code: "UPSTREAM_ERROR",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
