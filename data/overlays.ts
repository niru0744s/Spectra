export interface OverlayMetadata {
  overlayImageUrl: string;
  referenceEyeDist: number;
  offsetX: number;
  offsetY: number;
  scaleMultiplier: number;
}

const DEFAULT_OVERLAY_URL = "/overlays/default-glasses.svg";

const overlayData: Record<string, OverlayMetadata> = {
  "eclipse-aviators": {
    overlayImageUrl: DEFAULT_OVERLAY_URL,
    referenceEyeDist: 85,
    offsetX: 0,
    offsetY: -15,
    scaleMultiplier: 1.2,
  },
  kyoto: {
    overlayImageUrl: DEFAULT_OVERLAY_URL,
    referenceEyeDist: 80,
    offsetX: 5,
    offsetY: -12,
    scaleMultiplier: 1.15,
  },
  atlas: {
    overlayImageUrl: DEFAULT_OVERLAY_URL,
    referenceEyeDist: 90,
    offsetX: -5,
    offsetY: -18,
    scaleMultiplier: 1.25,
  },
  oslo: {
    overlayImageUrl: DEFAULT_OVERLAY_URL,
    referenceEyeDist: 82,
    offsetX: 2,
    offsetY: -14,
    scaleMultiplier: 1.18,
  },
};

export function getOverlayMetadata(productSlug: string): OverlayMetadata | null {
  return overlayData[productSlug] || null;
}

export function getAllOverlayMetadata(): Record<string, OverlayMetadata> {
  return overlayData;
}
