import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "tmp", "uploads");
const INDEX_FILE = path.join(UPLOAD_DIR, ".index.json");
const TTL_HOURS = parseInt(process.env.UPLOAD_TTL_HOURS || "6", 10);

interface UploadRecord {
  id: string;
  filename: string;
  uploadedAt: number;
  expiresAt: number;
}

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

function loadIndex(): UploadRecord[] {
  ensureUploadDir();
  if (!fs.existsSync(INDEX_FILE)) {
    return [];
  }
  try {
    const content = fs.readFileSync(INDEX_FILE, "utf-8");
    return JSON.parse(content) as UploadRecord[];
  } catch {
    return [];
  }
}

function saveIndex(records: UploadRecord[]) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify(records, null, 2));
}

export function generateUploadId(): string {
  return `upload_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function saveUpload(uploadId: string, buffer: Buffer): string {
  ensureUploadDir();
  const filename = `${uploadId}.bin`;
  const filepath = path.join(UPLOAD_DIR, filename);

  fs.writeFileSync(filepath, buffer);

  const now = Date.now();
  const expiresAt = now + TTL_HOURS * 3600 * 1000;

  const records = loadIndex();
  records.push({
    id: uploadId,
    filename,
    uploadedAt: now,
    expiresAt,
  });
  saveIndex(records);

  return uploadId;
}

export function getUploadPath(uploadId: string): string | null {
  const records = loadIndex();
  const record = records.find((r) => r.id === uploadId);

  if (!record) {
    return null;
  }

  if (Date.now() > record.expiresAt) {
    deleteUpload(uploadId);
    return null;
  }

  return path.join(UPLOAD_DIR, record.filename);
}

export function deleteUpload(uploadId: string): boolean {
  const filepath = path.join(UPLOAD_DIR, `${uploadId}.bin`);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }

  const records = loadIndex();
  const filtered = records.filter((r) => r.id !== uploadId);
  saveIndex(filtered);
  return true;
}

export function cleanupExpiredUploads(): { deleted: number; remaining: number } {
  const records = loadIndex();
  const now = Date.now();
  const expired: UploadRecord[] = [];
  const active: UploadRecord[] = [];

  records.forEach((record) => {
    if (now > record.expiresAt) {
      expired.push(record);
    } else {
      active.push(record);
    }
  });

  expired.forEach((record) => {
    const filepath = path.join(UPLOAD_DIR, record.filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  });

  saveIndex(active);

  return {
    deleted: expired.length,
    remaining: active.length,
  };
}

export function getUploadMetadata(uploadId: string) {
  const records = loadIndex();
  const record = records.find((r) => r.id === uploadId);

  if (!record) {
    return null;
  }

  if (Date.now() > record.expiresAt) {
    deleteUpload(uploadId);
    return null;
  }

  return {
    uploadId: record.id,
    expiresAt: new Date(record.expiresAt).toISOString(),
  };
}
