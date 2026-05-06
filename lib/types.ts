export type LandmarksResponse =
  | {
      ok: true;
      faceCount: number;
      confidence: number;
      image: {
        width: number;
        height: number;
      };
      landmarks: Record<string, { x: number; y: number }>;
      uploadId: string;
      expiresAt: string;
    }
  | {
      ok: false;
      code: "NO_FACE" | "MULTIPLE_FACES" | "LOW_CONFIDENCE" | "INVALID_FILE" | "UPSTREAM_ERROR";
      message: string;
    };

export interface PerfectCorpLandmark {
  x: number;
  y: number;
}

export interface PerfectCorpResponse {
  result?: {
    faces?: Array<{
      landmarks?: Record<string, PerfectCorpLandmark>;
      confidence?: number;
    }>;
    image?: {
      width?: number;
      height?: number;
    };
  };
  error?: string;
}

export const CONFIDENCE_THRESHOLD = 0.75;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
