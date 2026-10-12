import { siteConfig } from "../data/config";
import type { Product } from "../data/products";

export function enquiryMessage(product?: Product, size?: number) {
  if (!product)
    return "Hi TN Footwear, I'd like to ask about your footwear collection, current prices and availability. Could you also confirm your location and opening hours?";
  return `Hi TN Footwear, I'm interested in ${product.name}${size ? ` in size EU ${size}` : ""} (reference ${product.sku}). Photo reference: ${product.source}. Could you confirm the current price and availability?`;
}
export function whatsappUrl(
  message: string,
  number = siteConfig.whatsappNumber,
  confirmed = siteConfig.contactConfirmed,
): string | null {
  if (!confirmed || !/^[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
