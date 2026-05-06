# Spectra – Virtual Try-On E-Commerce Store

A Next.js + Tailwind CSS e-commerce storefront for Spectra sunglasses with an integrated **Virtual Try-On** feature powered by Perfect Corp face detection API.

## Features

- **Product Catalog**: Browse and filter sunglasses with detailed product pages
- **Virtual Try-On**: Upload a selfie and see sunglasses overlaid on your face in real-time
- **Canvas Rendering**: AI-powered face landmarks used to accurately position and scale sunglasses
- **Responsive Design**: Mobile-first design matching Spectra brand guidelines
- **Mock Data**: Ready for backend integration with realistic product & cart data

## Virtual Try-On Overview

The Virtual Try-On feature allows users to upload a front-facing photo on a product detail page. The system:

1. **Detects face landmarks** using Perfect Corp API (eyes, nose, etc.)
2. **Validates the image** (single face, good lighting, JPG/PNG)
3. **Renders an overlay** using HTML Canvas with transform calculations based on eye position
4. **Provides controls** for scale and rotation adjustments
5. **Stores images temporarily** with automatic TTL-based deletion (6 hours by default)

### How It Works

**Backend Flow:**
- User uploads image → \/api/face/landmarks\ (POST)
- Route validates file (JPG/PNG, <10MB)
- Sends to Perfect Corp API for face detection
- Returns landmarks (eye positions, confidence, etc.) or error
- Image stored locally with TTL metadata

**Frontend Flow:**
- File upload triggers processing state
- Landmarks API returns eye coordinates
- Canvas draws uploaded image + transformed overlay
- Scale/Rotate sliders adjust overlay in real-time
- Error banner shows if no face / multiple faces / low quality

## Environment Setup

Create a \.env.local\ file based on \.env.example\:

\\\ash
# Perfect Corp API credentials
PERFECTCORP_API_KEY=your_api_key_here
PERFECTCORP_API_SECRET=your_api_secret_here

# Upload expiration
UPLOAD_TTL_HOURS=6

# Cleanup endpoint protection
CLEANUP_TOKEN=your_secret_cleanup_token_here
\\\

**Note:** Never commit real API keys. Use \.env.local\ (gitignored) for development.

### Getting API Credentials

1. **Perfect Corp**: Sign up at [perfectcorp.com](https://perfectcorp.com) and request API access
2. Request will include API key and secret for authentication

## API Endpoints

### POST /api/face/landmarks
Uploads an image and returns face landmarks.

**Request:**
\\\javascript
const formData = new FormData();
formData.append('file', imageFile); // File input

const response = await fetch('/api/face/landmarks', {
  method: 'POST',
  body: formData
});
const data = await response.json();
\\\

**Success Response (ok: true):**
\\\json
{
  "ok": true,
  "faceCount": 1,
  "confidence": 0.95,
  "image": { "width": 1080, "height": 1440 },
  "landmarks": {
    "leftEye": { "x": 400, "y": 500 },
    "rightEye": { "x": 680, "y": 510 },
    "noseTip": { "x": 540, "y": 600 }
  },
  "uploadId": "upload_1234567890_abc1234",
  "expiresAt": "2024-03-05T14:30:00Z"
}
\\\

**Error Response (ok: false):**
\\\json
{
  "ok": false,
  "code": "NO_FACE" | "MULTIPLE_FACES" | "LOW_CONFIDENCE" | "INVALID_FILE" | "UPSTREAM_ERROR",
  "message": "Human-readable error description"
}
\\\

### POST /api/internal/cleanup-uploads
Triggers manual cleanup of expired uploads. **Protected by CLEANUP_TOKEN.**

**Request:**
\\\ash
curl -X POST http://localhost:3000/api/internal/cleanup-uploads \
  -H "x-cleanup-token: YOUR_CLEANUP_TOKEN"
\\\

**Response:**
\\\json
{
  "ok": true,
  "deleted": 5,
  "remaining": 12
}
\\\

## File Structure

\\\
app/
├── api/
│   ├── face/
│   │   └── landmarks/
│   │       └── route.ts          # Face detection API
│   └── internal/
│       └── cleanup-uploads/
│           └── route.ts           # Cleanup trigger endpoint
├── product/
│   └── [slug]/
│       └── page.tsx               # Product detail with try-on
└── ...other routes

components/store/
├── try-on-module.tsx              # Main try-on UI & canvas rendering
└── ...other components

lib/
├── storage.ts                     # Upload storage & TTL management
├── types.ts                       # Type definitions for API
└── mock-data.ts                  # Product, cart, order data

data/
└── overlays.ts                   # Per-product overlay calibration

public/overlays/                  # Sunglasses overlay PNG assets
└── *.png                         # e.g. eclipse-aviators.png
\\\

## Uploading Overlay Assets

Each product needs a PNG overlay image (sunglasses only, transparent background).

1. Add overlay PNG to \public/overlays/\ with product slug name:
   - \clipse-aviators.png\
   - \kyoto.png\
   - \tlas.png\
   - \oslo.png\

2. Update calibration in \data/overlays.ts\:
   \\\	ypescript
   overlayData["eclipse-aviators"] = {
     overlayImageUrl: "/overlays/eclipse-aviators.png",
     referenceEyeDist: 85,      // Distance between eyes in reference photo
     offsetX: 0,                 // X offset from eye midpoint
     offsetY: -15,               // Y offset from eye midpoint
     scaleMultiplier: 1.2        // Base scale multiplier
   };
   \\\

## Known Limitations

- **Single face only**: API returns error if 0 or 2+ faces detected
- **Front-facing photos**: Sideways or angled photos may fail detection
- **Good lighting**: Low-quality or backlit photos may return \LOW_CONFIDENCE\ error
- **Sunglasses overlay only**: Currently supports overlay transformation for frames; eyes/lenses require additional rendering
- **Temporary storage**: Uploaded images are **deleted after 6 hours** for privacy
- **Confidence threshold**: Faces below 75% confidence are rejected

## Development

### Run Development Server

\\\ash
npm run dev
\\\

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

\\\ash
npm run build
npm run start
\\\

### Manual Cleanup

To manually trigger cleanup of expired uploads:

\\\ash
curl -X POST http://localhost:3000/api/internal/cleanup-uploads \
  -H "x-cleanup-token: \"
\\\

Or set up a cron job to call this endpoint periodically.

## Testing the Try-On Feature

1. Navigate to any product detail page (e.g., \/product/eclipse-aviators\)
2. Scroll to "Virtual Try-On" section
3. Upload a clear, front-facing selfie (JPG or PNG)
4. System will detect landmarks and render overlay
5. Use Scale/Rotate sliders to fine-tune fit
6. View error banner if upload fails

### Test Scenarios

| Scenario | Expected Result |
|----------|-----------------|
| Single clear face | Overlay renders, sliders active |
| No faces detected | Error: "No face detected" |
| Multiple faces | Error: "Multiple faces detected" |
| Low quality / no eyes | Error: "Photo quality too low" |
| Wrong file type | Error: "File must be JPG or PNG" |
| File >10MB | Error: "File too large" |

## Future Enhancements

- [ ] Real-time webcam try-on (camera input instead of upload)
- [ ] Before/after slider (currently UI-only)
- [ ] Lens color/tint customization
- [ ] Product comparison side-by-side
- [ ] Share try-on result (temporary URL)
- [ ] Prescription lens integration
- [ ] Multiple overlay types (frames, lens colors, temples)

## Tech Stack

- **Framework**: Next.js 16.2+ (App Router)
- **Styling**: Tailwind CSS 4
- **Face Detection**: Perfect Corp API
- **Storage**: Local filesystem (with TTL manager)
- **Icons**: Material Symbols Outlined
- **Canvas Rendering**: Native HTML5 Canvas API

## Troubleshooting

### "Missing Perfect Corp credentials" error
- Ensure \PERFECTCORP_API_KEY\ and \PERFECTCORP_API_SECRET\ are set in \.env.local\
- Verify credentials are correct and not expired

### Canvas overlay not rendering
- Check browser console for errors
- Verify overlay image exists at \/public/overlays/[slug].png\
- Confirm face landmarks returned from API contain \leftEye\ and \ightEye\

### "File size too large" error
- Max file size is 10MB (configurable in \lib/types.ts\)
- Compress image before uploading

### Cleanup endpoint not working
- Verify \CLEANUP_TOKEN\ header matches \process.env.CLEANUP_TOKEN\
- Check that \x-cleanup-token\ header is included in request

## License

Part of the Spectra e-commerce project.
