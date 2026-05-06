"use client";

import { useRef, useState, useEffect } from "react";
import { LandmarksResponse } from "@/lib/types";
import { OverlayMetadata, getOverlayMetadata } from "@/data/overlays";

type TryOnModuleProps = {
  productSlug: string;
};

type ErrorState = {
  visible: boolean;
  code: string;
  message: string;
};

export function TryOnModule({ productSlug }: TryOnModuleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scale, setScale] = useState(50);
  const [rotation, setRotation] = useState(50);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [landmarks, setLandmarks] = useState<Record<string, { x: number; y: number }> | null>(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({
    visible: false,
    code: "",
    message: "",
  });
  const [overlayData, setOverlayData] = useState<OverlayMetadata | null>(null);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const metadata = getOverlayMetadata(productSlug);
    setOverlayData(metadata);

    if (metadata) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setOverlayImage(img);
      img.onerror = () => {
        setError({
          visible: true,
          code: "UPSTREAM_ERROR",
          message: "Overlay asset missing. Please add overlay files under public/overlays.",
        });
      };
      img.src = metadata.overlayImageUrl;
    }
  }, [productSlug]);

  useEffect(() => {
    if (!uploadedImage || !landmarks || !overlayImage || !overlayData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    ctx.drawImage(uploadedImage, 0, 0, imageWidth, imageHeight);

    const leftEye = landmarks["leftEye"] || landmarks["left_eye"];
    const rightEye = landmarks["rightEye"] || landmarks["right_eye"];

    if (leftEye && rightEye) {
      const eyeMidX = (leftEye.x + rightEye.x) / 2;
      const eyeMidY = (leftEye.y + rightEye.y) / 2;
      const eyeDistance = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
      const eyeAngle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);

      const scaleValue = 0.85 + scale / 200;
      const scaleFactor = (eyeDistance / (overlayData.referenceEyeDist || 85)) * (overlayData.scaleMultiplier || 1) * scaleValue;
      const rotateValue = ((rotation - 50) * 0.36) + (eyeAngle * 180) / Math.PI;

      const offsetX = overlayData.offsetX || 0;
      const offsetY = overlayData.offsetY || 0;

      ctx.save();
      ctx.translate(eyeMidX + offsetX, eyeMidY + offsetY);
      ctx.rotate((rotateValue * Math.PI) / 180);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(overlayImage, -overlayImage.width / 2, -overlayImage.height / 2);
      ctx.restore();
    }
  }, [uploadedImage, landmarks, overlayImage, scale, rotation, imageWidth, imageHeight, overlayData]);

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;

    setIsLoading(true);
    setError({ visible: false, code: "", message: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/face/landmarks", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as LandmarksResponse;

      if (!data.ok) {
        setError({
          visible: true,
          code: data.code,
          message: data.message,
        });
        setLandmarks(null);
        setUploadedImage(null);
        setUploadedImageUrl("");
        return;
      }

      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
      setImageWidth(data.image.width);
      setImageHeight(data.image.height);
      setLandmarks(data.landmarks);

      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
      };
      img.src = url;

      setError({ visible: false, code: "", message: "" });
    } catch (err) {
      console.error("Upload failed:", err);
      setError({
        visible: true,
        code: "UPSTREAM_ERROR",
        message: "Upload failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const scaleValue = 0.8 + scale / 100;
  const rotateValue = (rotation - 50) * 1.2;

  const errorMessages: Record<string, string> = {
    NO_FACE: "No face detected",
    MULTIPLE_FACES: "Multiple faces detected",
    LOW_CONFIDENCE: "Photo quality too low",
    INVALID_FILE: "Invalid file format",
    UPSTREAM_ERROR: "Processing error",
  };

  return (
    <section
      id="virtual-try-on"
      tabIndex={-1}
      className="mb-20 overflow-hidden rounded-xl border border-[#e5e2e1] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] outline-none"
    >
      <div className="flex items-center justify-between border-b border-[#e5e2e1] p-6">
        <h2 className="text-2xl font-medium text-[#1b1b1c]">Virtual Try-On</h2>
        <span className="rounded-full bg-[#e2e3e1] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-600">
          Beta
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative order-2 flex h-[500px] items-center justify-center overflow-hidden border-r border-[#e5e2e1] bg-[#f0eded] md:order-1">
          {!uploadedImage ? (
            <>
              <span className="absolute left-4 top-4 z-10 rounded bg-black/40 px-2 py-1 text-xs uppercase text-white">
                Preview
              </span>
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined mb-2 text-[48px] text-zinc-400">
                  image
                </span>
                <p className="text-sm text-zinc-500">Upload a photo to see preview</p>
              </div>
            </>
          ) : (
            <>
              <span className="absolute left-4 top-4 z-10 rounded bg-black/40 px-2 py-1 text-xs uppercase text-white">
                Before
              </span>
              <canvas
                ref={canvasRef}
                className="h-full w-full object-cover"
                style={{ maxHeight: "500px" }}
              />
              <div className="absolute bottom-0 left-1/2 top-0 flex w-1 -translate-x-1/2 items-center justify-center bg-white">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e2e1] bg-white shadow-md">
                  <span className="material-symbols-outlined text-[16px] text-zinc-500">swap_horiz</span>
                </div>
              </div>
              <span className="absolute right-4 top-4 z-10 rounded bg-black/40 px-2 py-1 text-xs uppercase text-white">
                After
              </span>
            </>
          )}
        </div>

        <div className="order-1 flex flex-col justify-between bg-[#fcf9f8] p-6 md:order-2">
          <div>
            <label
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="mb-4 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-zinc-300 bg-white p-8 text-center hover:bg-[#f6f3f2]"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined mb-2 animate-spin text-[32px] text-zinc-500">
                    hourglass_empty
                  </span>
                  <p className="text-sm font-medium text-[#1b1b1c]">Processing...</p>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined mb-2 text-[32px] text-zinc-500">
                    cloud_upload
                  </span>
                  <p className="text-sm font-medium text-[#1b1b1c]">Drag &amp; drop your photo</p>
                  <p className="text-sm text-zinc-500">or click to browse</p>
                  <p className="mt-1 text-xs text-zinc-500">JPG/PNG • Front-facing • Good lighting</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                disabled={isLoading}
              />
            </label>

            <p className="mb-4 text-center text-xs text-zinc-500">
              Privacy note: Photos are deleted after 6 hours.
            </p>

            {landmarks && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Scale
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={scale}
                    onChange={(event) => setScale(Number(event.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-300 accent-[#1e2a44]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Rotate
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={rotation}
                    onChange={(event) => setRotation(Number(event.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-300 accent-[#1e2a44]"
                  />
                </div>
              </div>
            )}
          </div>

          {error.visible && (
            <div className="mt-6 rounded-lg border border-[#ffb4ab] bg-[#ffdad6] p-3">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#ba1a1a]">error</span>
                <div>
                  <p className="text-sm font-medium text-[#93000a]">{errorMessages[error.code] || error.code}</p>
                  <p className="text-xs text-[#93000a]">{error.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
