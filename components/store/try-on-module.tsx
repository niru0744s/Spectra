"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const SKINCARE_PRODUCTS = [
  {
    id: "salicylic-acid",
    slug: "clarifying-bha-wash",
    name: "Clarifying BHA 2% Gel Wash",
    brand: "Lumina Labs",
    price: "$28.00",
    target: "acne",
    description: "Deep-cleansing salicylic acid targets breakouts and unclogs pores without stripping moisture.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=600",
  },
  {
    id: "niacinamide",
    slug: "niacinamide-drops",
    name: "Niacinamide + Zinc Mattifying Drops",
    brand: "Lumina Labs",
    price: "$34.00",
    target: "oiliness",
    description: "A lightweight serum that visibly regulates sebum production and refines pore texture.",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600&h=600",
  },
  {
    id: "hydro-plump",
    slug: "hydro-plump",
    name: "Hydro-Plump Moisture Surge",
    brand: "AquaBotanica",
    price: "$42.00",
    target: "moisture",
    description: "Multi-molecular hyaluronic acid instantly hydrates and plumps for a dewy, glass-skin finish.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=600",
  },
  {
    id: "retinol",
    slug: "retinol-renewal",
    name: "Retinol 0.5% Night Renewal",
    brand: "DermaScience",
    price: "$65.00",
    target: "skin_age",
    description: "Accelerates cellular turnover to smooth fine lines and restore youthful elasticity while you sleep.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600&h=600",
  }
];

type TryOnModuleProps = {
  productSlug?: string;
};

type SkinMetric = {
  type: string;
  ui_score?: number;
  score?: number;
};

type ErrorState = {
  visible: boolean;
  code: string;
  message: string;
};

export function TryOnModule({ productSlug }: TryOnModuleProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [skinData, setSkinData] = useState<SkinMetric[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({
    visible: false,
    code: "",
    message: "",
  });

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;

    setIsLoading(true);
    setError({ visible: false, code: "", message: "" });
    setSkinData(null);
    
    const localUrl = URL.createObjectURL(file);
    setUploadedImage(localUrl);

    try {
      // Compress image to bypass Cloudinary's 10MB limit
      const compressedFile = await new Promise<File>((resolve, reject) => {
        const img = new Image();
        img.src = localUrl;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 1500; // Perfect for PerfectCorp, avoids file too small, but ensures small MB
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error("Canvas toBlob failed"));
            resolve(new File([blob], file.name || "compressed.jpg", { type: "image/jpeg" }));
          }, "image/jpeg", 0.85); // 85% quality to massively reduce MB
        };
        img.onerror = reject;
      });

      const formData = new FormData();
      formData.append("file", compressedFile);

      const response = await fetch("/api/face/landmarks", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.ok) {
        setError({
          visible: true,
          code: data.code || "API_ERROR",
          message: data.message || "Failed to analyze skin.",
        });
        return;
      }

      setSkinData(data.data.skinAnalysis);
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

  // Helper to find specific metrics
  const getMetric = (type: string) => {
    if (!skinData) return null;
    if (!Array.isArray(skinData)) {
      console.warn("skinData is not an array:", skinData);
      // Try to see if it's an object with the metric as a key
      const metricObj = (skinData as any)[type];
      if (metricObj) return metricObj.ui_score || metricObj.score || metricObj;
      return null;
    }
    const metric = skinData.find((m: any) => m.type === type);
    return metric ? (metric.ui_score || metric.score || 0) : null;
  };

  const skinAge = getMetric("skin_age");
  const oiliness = getMetric("oiliness");
  const moisture = getMetric("moisture");
  const acne = getMetric("acne");

  // Determine which products to recommend based on scores
  // If oiliness is high, recommend oil control. If moisture is low, recommend hydration.
  // We'll just recommend the top 2 products that fit their profile best.
  let recommendations = [...SKINCARE_PRODUCTS];
  if (skinData) {
    recommendations = recommendations.sort((a, b) => {
      // Very basic mock logic: push the product they need most to the top
      let aScore = 0;
      if (a.target === "acne" && acne && acne > 70) aScore = 100;
      if (a.target === "oiliness" && oiliness && oiliness > 70) aScore = 90;
      if (a.target === "moisture" && moisture && moisture < 50) aScore = 80;
      if (a.target === "skin_age" && skinAge && skinAge > 30) aScore = 70;
      
      let bScore = 0;
      if (b.target === "acne" && acne && acne > 70) bScore = 100;
      if (b.target === "oiliness" && oiliness && oiliness > 70) bScore = 90;
      if (b.target === "moisture" && moisture && moisture < 50) bScore = 80;
      if (b.target === "skin_age" && skinAge && skinAge > 30) bScore = 70;
      
      return bScore - aScore;
    }).slice(0, 2); // Show top 2
  }

  return (
    <section
      id="virtual-try-on"
      tabIndex={-1}
      className="mb-20 overflow-hidden rounded-[12px] border border-[#e5e2e1] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] outline-none"
    >
      <div className="flex items-center justify-between border-b border-[#e5e2e1] p-6">
        <h2 className="text-2xl font-medium text-[#1E1E1E] tracking-tight">AI Skincare Analyzer</h2>
        <span className="rounded-full bg-[#1E2A44]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1E2A44]">
          Clinical Scan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative flex min-h-[500px] flex-col items-center justify-center border-b border-[#e5e2e1] bg-[#FAFAF8] p-8 md:border-b-0 md:border-r">
          {!uploadedImage ? (
            <div className="flex w-full flex-col items-center">
              <label
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="group flex h-64 w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-[12px] border border-[#E8E8E8] bg-white transition-all hover:border-[#1E2A44] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAFAF8] text-[#1E2A44] transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-[32px]">
                    add_a_photo
                  </span>
                </div>
                <span className="mt-6 text-sm font-medium text-[#1E1E1E]">Select an image</span>
                <p className="mt-2 text-xs text-[#75777e]">Ensure good lighting and no makeup</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className="sr-only"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                  disabled={isLoading}
                />
              </label>
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center">
              <div className="relative mb-8 h-72 w-72 overflow-hidden rounded-[12px] border border-[#E8E8E8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <img src={uploadedImage} alt="Your selfie" className="h-full w-full object-cover" />
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white backdrop-blur-sm">
                    <span className="material-symbols-outlined mb-2 animate-spin text-[40px]">
                      autorenew
                    </span>
                    <span className="text-sm font-medium">Analyzing Skin...</span>
                  </div>
                )}
              </div>
              
              {!isLoading && (
                <button 
                  onClick={() => {
                    setUploadedImage(null);
                    setSkinData(null);
                  }}
                  className="rounded-[12px] border border-[#E8E8E8] bg-white px-6 py-2.5 text-sm font-medium text-[#1E2A44] shadow-sm transition-all hover:bg-[#FAFAF8] hover:shadow-md"
                >
                  Analyze Another Photo
                </button>
              )}
            </div>
          )}

          {error.visible && (
            <div className="mt-6 w-full max-w-sm rounded-[12px] border border-[#E8E8E8] bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 text-xl text-[#1E2A44]">error</span>
                <div>
                  <p className="text-sm font-semibold text-[#1E2A44]">Error</p>
                  <p className="mt-1 text-xs text-[#75777e] opacity-90">{error.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col bg-white p-6 md:p-8">
          {skinData ? (
            <div className="animate-in fade-in slide-in-from-right-4 h-full duration-500">
              <h3 className="mb-6 font-medium text-[#1E1E1E] text-2xl tracking-tight">Your Skin Report</h3>
              
              <div className="mb-10 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#E8E8E8] bg-[#FAFAF8] p-5">
                  <span className="text-3xl font-light text-[#1E2A44]">{skinAge || "--"}</span>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#75777e]">Skin Age</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#E8E8E8] bg-[#FAFAF8] p-5">
                  <span className="text-3xl font-light text-[#1E2A44]">{moisture || "--"}<span className="text-lg text-[#c5c6ce]">/100</span></span>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#75777e]">Moisture</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#E8E8E8] bg-[#FAFAF8] p-5">
                  <span className="text-3xl font-light text-[#1E2A44]">{oiliness || "--"}<span className="text-lg text-[#c5c6ce]">/100</span></span>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#75777e]">Oiliness</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#E8E8E8] bg-[#FAFAF8] p-5">
                  <span className="text-3xl font-light text-[#1E2A44]">{acne || "--"}<span className="text-lg text-[#c5c6ce]">/100</span></span>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#75777e]">Acne Score</span>
                </div>
              </div>

              <h3 className="mb-5 text-lg font-medium tracking-tight text-[#1E1E1E]">Curated Regimen</h3>
              <div className="space-y-4">
                {recommendations.slice(0, 3).map((product) => (
                  <Link href={`/product/${product.slug}`} key={product.id} className="group relative flex cursor-pointer items-start gap-5 rounded-[12px] border border-[#E8E8E8] bg-white p-5 transition-all duration-300 hover:border-[#1E2A44] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-[8px] bg-[#FAFAF8]">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex h-full flex-col justify-center">
                      <div className="mb-1 flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#75777e]">{product.brand}</p>
                      </div>
                      <h4 className="line-clamp-1 text-base font-medium text-[#1E1E1E] leading-snug">{product.name}</h4>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#45464d]">{product.description}</p>
                      <p className="mt-3 text-sm font-semibold text-[#1E2A44]">{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined mb-6 text-[48px] text-[#c5c6ce]">
                document_scanner
              </span>
              <p className="text-xl font-medium tracking-tight text-[#1E1E1E]">Awaiting Scan</p>
              <p className="mt-2 text-sm leading-relaxed text-[#75777e]">
                Upload your portrait to generate a<br/>clinical-grade skin analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
