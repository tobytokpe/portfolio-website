#!/bin/bash
# Usage: ./scripts/convert-video.sh input.mov output.mp4
# Converts any Mac HDR screen recording to clean SDR MP4 for web use.
# No dark overlay, no pixelation, browser-ready.

INPUT="$1"
OUTPUT="$2"

if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
  echo "Usage: ./scripts/convert-video.sh <input.mov> <output.mp4>"
  exit 1
fi

/opt/homebrew/bin/ffmpeg -y -i "$INPUT" \
  -vf "colorspace=all=bt709:iall=bt2020:itrc=bt2020-10:iprimaries=bt2020:ispace=bt2020nc,format=yuv420p" \
  -c:v libx264 -crf 18 -preset slow \
  -profile:v high -level:v 4.0 \
  -movflags +faststart \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -map_metadata -1 \
  "$OUTPUT"

echo "✅ Done → $OUTPUT"
