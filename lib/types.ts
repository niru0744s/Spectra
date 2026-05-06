export type LandmarksResponse =
  | {
      ok: true;
      data?: {
        skinAnalysis?: any;
      };
      faceCount?: number;
      confidence?: number;
      image?: {
        width: number;
        height: number;
      };
      faceRect?: { x: number; y: number; width: number; height: number; };
      landmarks?: Record<string, { x: number; y: number }>;
      uploadId?: string;
      expiresAt?: string;
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
      rect?: { x: number; y: number; width: number; height: number; };
      landmarks?: Record<string, PerfectCorpLandmark>;
      confidence?: number;
    }>;
    image?: {
      width?: number;
      height?: number;
    };
  };
  output?: any;
  results?: any;
  error?: string;
}

export const CONFIDENCE_THRESHOLD = 0.75;
export const MAX_FILE_SIZE = 25 * 1024 * 1024;
