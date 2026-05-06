import { glassesProducts } from "@/data/glasses-products";

export interface OverlayMetadata {
  overlayImageUrl: string;
  referenceEyeDist: number;
  offsetX: number;
  offsetY: number;
  scaleMultiplier: number;
}

const DEFAULT_OVERLAY_URL = "/assets/glasses/img1.png";

const overlayData: Record<string, OverlayMetadata> = glassesProducts.reduce(
  (acc, product) => {
    acc[product.slug] = {
      overlayImageUrl: product.image,
      referenceEyeDist: 85,
      offsetX: 0,
      offsetY: product.yOffset,
      scaleMultiplier: product.scaleFactor,
    };
    return acc;
  },
  {} as Record<string, OverlayMetadata>
);

export function getOverlayMetadata(productSlug: string): OverlayMetadata | null {
  return (
    overlayData[productSlug] || {
      overlayImageUrl: DEFAULT_OVERLAY_URL,
      referenceEyeDist: 85,
      offsetX: 0,
      offsetY: 6,
      scaleMultiplier: 2.0,
    }
  );
}

export function getAllOverlayMetadata(): Record<string, OverlayMetadata> {
  return overlayData;
}
