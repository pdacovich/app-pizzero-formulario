import { ImageResponse } from "next/og";

import { createSocialCardMarkup } from "@/lib/og/social-card";

export const runtime = "edge";
export const alt = "APP Pizzeros - Investigacion de producto";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(createSocialCardMarkup(), size);
}
