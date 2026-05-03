"use client";

import { useState } from "react";

type TryOnModuleProps = {
  modelImage: string;
  overlayImage: string;
};

export function TryOnModule({ modelImage, overlayImage }: TryOnModuleProps) {
  const [scale, setScale] = useState(50);
  const [rotation, setRotation] = useState(50);

  const scaleValue = 0.8 + scale / 100;
  const rotateValue = (rotation - 50) * 1.2;

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
          <span className="absolute left-4 top-4 z-10 rounded bg-black/40 px-2 py-1 text-xs uppercase text-white">
            Before
          </span>
          <img src={modelImage} alt="Face Preview" className="h-full w-full object-cover" />
          <div
            className="pointer-events-none absolute left-1/2 top-[35%] w-48 -translate-x-1/2 opacity-90 mix-blend-multiply drop-shadow-lg"
            style={{ transform: `translateX(-50%) scale(${scaleValue}) rotate(${rotateValue}deg)` }}
          >
            <img src={overlayImage} alt="Glasses overlay" className="h-auto w-full" />
          </div>
          <div className="absolute bottom-0 left-1/2 top-0 flex w-1 -translate-x-1/2 items-center justify-center bg-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e2e1] bg-white shadow-md">
              <span className="material-symbols-outlined text-[16px] text-zinc-500">swap_horiz</span>
            </div>
          </div>
          <span className="absolute right-4 top-4 z-10 rounded bg-black/40 px-2 py-1 text-xs uppercase text-white">
            After
          </span>
        </div>

        <div className="order-1 flex flex-col justify-between bg-[#fcf9f8] p-6 md:order-2">
          <div>
            <label className="mb-4 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-zinc-300 bg-white p-8 text-center hover:bg-[#f6f3f2]">
              <span className="material-symbols-outlined mb-2 text-[32px] text-zinc-500">
                cloud_upload
              </span>
              <p className="text-sm font-medium text-[#1b1b1c]">Drag &amp; drop your photo</p>
              <p className="text-sm text-zinc-500">or click to browse</p>
              <p className="mt-1 text-xs text-zinc-500">JPG/PNG • Front-facing • Good lighting</p>
              <input type="file" className="sr-only" />
            </label>

            <p className="mb-4 text-center text-xs text-zinc-500">
              Privacy note: Photos are deleted after 6 hours.
            </p>

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
          </div>

          <div className="mt-6 rounded-lg border border-[#ffb4ab] bg-[#ffdad6] p-3">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a]">error</span>
              <div>
                <p className="text-sm font-medium text-[#93000a]">No face detected</p>
                <p className="text-xs text-[#93000a]">
                  Please upload a clear, front-facing photo. Avoid sunglasses and filters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
