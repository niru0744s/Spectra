import { NextRequest, NextResponse } from "next/server";
import {
  LandmarksResponse,
  CONFIDENCE_THRESHOLD,
  MAX_FILE_SIZE,
  PerfectCorpResponse,
} from "@/lib/types";
import { generateUploadId, saveUpload, getUploadMetadata } from "@/lib/storage";

function getMockLandmarksResponse(
  imageWidth: number,
  imageHeight: number
): PerfectCorpResponse {
  return {
    result: {
      faces: [
        {
          confidence: 0.92,
          landmarks: {
            leftEye: { x: imageWidth * 0.35, y: imageHeight * 0.4 },
            rightEye: { x: imageWidth * 0.65, y: imageHeight * 0.4 },
            noseTip: { x: imageWidth * 0.5, y: imageHeight * 0.55 },
            leftEar: { x: imageWidth * 0.15, y: imageHeight * 0.45 },
            rightEar: { x: imageWidth * 0.85, y: imageHeight * 0.45 },
          },
        },
      ],
      image: {
        width: imageWidth,
        height: imageHeight,
      },
    },
  };
}

async function callPerfectCorpAPI(
  imageBuffer: Buffer
): Promise<PerfectCorpResponse | null> {
  const apiKey = process.env.PERFECTCORP_API_KEY;
  const apiSecret = process.env.PERFECTCORP_API_SECRET;
  const landmarksUrl =
    process.env.PERFECTCORP_LANDMARKS_URL ||
    "https://api.perfectcorp.com/face-detection";
  const useMock = process.env.USE_MOCK_LANDMARKS === "true";

  if (!apiKey || !apiSecret) {
    console.error("Missing Perfect Corp credentials");
    if (useMock) {
      console.warn("Using mock landmarks (no credentials provided)");
      return getMockLandmarksResponse(1280, 720);
    }
    return null;
  }

  try {
    const formData = new FormData();
    const arrayBuffer = imageBuffer.buffer.slice(
      imageBuffer.byteOffset,
      imageBuffer.byteOffset + imageBuffer.byteLength
    ) as ArrayBuffer;
    const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
    formData.append("file", blob, "image.jpg");

    const response = await fetch(landmarksUrl, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "X-API-Secret": apiSecret,
      },
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const upstreamBody = await response.text();
      console.error("Perfect Corp API error:", response.status, upstreamBody);
      if (useMock) {
        console.warn("Upstream returned non-2xx, falling back to mock landmarks");
        return getMockLandmarksResponse(1280, 720);
      }
      return null;
    }

    return (await response.json()) as PerfectCorpResponse;
  } catch (error) {
    console.error("Perfect Corp API call failed:", error);
    if (useMock) {
      console.warn("Real API failed, falling back to mock landmarks");
      return getMockLandmarksResponse(1280, 720);
    }
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

    const perfectCorpResponse = await callPerfectCorpAPI(imageBuffer);

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

    if (perfectCorpResponse.error || !perfectCorpResponse.result) {
      return NextResponse.json(
        {
          ok: false,
          code: "UPSTREAM_ERROR",
          message:
            perfectCorpResponse.error ||
            "Unknown error from face detection service",
        },
        { status: 500 }
      );
    }

    const faces = perfectCorpResponse.result.faces || [];

    if (faces.length === 0) {
      return NextResponse.json({
        ok: false,
        code: "NO_FACE",
        message: "No face detected in the image",
      });
    }

    if (faces.length > 1) {
      return NextResponse.json({
        ok: false,
        code: "MULTIPLE_FACES",
        message: "Multiple faces detected. Please upload a photo with only one face.",
      });
    }

    const face = faces[0];
    const confidence = face.confidence || 0;

    if (confidence < CONFIDENCE_THRESHOLD) {
      const percent = (confidence * 100).toFixed(1);
      return NextResponse.json({
        ok: false,
        code: "LOW_CONFIDENCE",
        message: `Face confidence too low (${percent}%). Please try a clearer photo.`,
      });
    }

    const landmarks = face.landmarks || {};
    const imageWidth = perfectCorpResponse.result.image?.width || 0;
    const imageHeight = perfectCorpResponse.result.image?.height || 0;

    if (!imageWidth || !imageHeight) {
      return NextResponse.json(
        {
          ok: false,
          code: "UPSTREAM_ERROR",
          message: "Invalid image dimensions from face detection service",
        },
        { status: 500 }
      );
    }

    const uploadId = generateUploadId();
    saveUpload(uploadId, imageBuffer);

    const metadata = getUploadMetadata(uploadId);

    return NextResponse.json({
      ok: true,
      faceCount: 1,
      confidence,
      image: {
        width: imageWidth,
        height: imageHeight,
      },
      landmarks,
      uploadId,
      expiresAt:
        metadata?.expiresAt ||
        new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
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
