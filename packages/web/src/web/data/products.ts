export type Category = "All footwear" | "Everyday sneakers" | "Retro runners" | "Street style";
export type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "All footwear">;
  price: number;
  currency: "USD";
  image: string;
  alt: string;
  sku: string;
  sizes: number[];
  stock: "unknown";
  status: "illustrative" | "verified";
  source: string;
  sourceDate: string;
  colour: string;
  tag?: string;
};
export const categories: Category[] = [
  "All footwear",
  "Everyday sneakers",
  "Retro runners",
  "Street style",
];
// Actual publicly posted TN imagery; user authorised reuse. Labels, sizes and prices
// are demo data, not an authentication claim or confirmed available stock.
export const products: Product[] = [
  {
    id: "court-white",
    name: "The Everyday Low",
    category: "Everyday sneakers",
    price: 16,
    currency: "USD",
    image: "/images/court-white.webp",
    alt: "White low-top sneaker held outdoors in Bulawayo, photographed by TN Footwear",
    sku: "TN-DEMO-01",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    stock: "unknown",
    status: "illustrative",
    colour: "Clean white",
    tag: "EVERYDAY ROTATION",
    source: "https://www.tiktok.com/@tnfootwear0/video/7695838059018915092",
    sourceDate: "2026-10-12",
  },
  {
    id: "terrace-white",
    name: "The Terrace Classic",
    category: "Everyday sneakers",
    price: 20,
    currency: "USD",
    image: "/images/terrace-white.webp",
    alt: "White and charcoal terrace-style sneakers held in a hand outdoors",
    sku: "TN-DEMO-02",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: "unknown",
    status: "illustrative",
    colour: "White / charcoal",
    source: "https://www.tiktok.com/@tnfootwear0/video/7695425620842499348",
    sourceDate: "2026-10-11",
  },
  {
    id: "silver-runner",
    name: "The Silver Runner",
    category: "Retro runners",
    price: 25,
    currency: "USD",
    image: "/images/silver-runner.webp",
    alt: "Silver and white mesh running-style sneaker with a red hangtag, from TN Footwear's public post",
    sku: "TN-DEMO-03",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    stock: "unknown",
    status: "illustrative",
    colour: "Silver / white",
    tag: "RETRO ENERGY",
    source: "https://www.tiktok.com/@tnfootwear0/video/7692371866320669972",
    sourceDate: "2026-10-03",
  },
  {
    id: "rope-pink",
    name: "The Pink Rope Low",
    category: "Street style",
    price: 25,
    currency: "USD",
    image: "/images/rope-pink.webp",
    alt: "Pink low-top sneakers with thick rope laces worn on a tiled floor",
    sku: "TN-DEMO-04",
    sizes: [36, 37, 38, 39, 40, 41],
    stock: "unknown",
    status: "illustrative",
    colour: "Dusty pink",
    tag: "A LITTLE DIFFERENT",
    source: "https://www.tiktok.com/@tnfootwear0/video/7689756349407726849",
    sourceDate: "2026-09-26",
  },
  {
    id: "forest-runner",
    name: "The Forest Runner",
    category: "Retro runners",
    price: 28,
    currency: "USD",
    image: "/images/forest-runner.webp",
    alt: "Forest-green running-style sneakers with cream soles worn in the shop",
    sku: "TN-DEMO-05",
    sizes: [39, 40, 41, 42, 43, 44],
    stock: "unknown",
    status: "illustrative",
    colour: "Forest / cream",
    source: "https://www.tiktok.com/@tnfootwear0/video/7686419770866027797",
    sourceDate: "2026-09-17",
  },
  {
    id: "terrace-blue",
    name: "The Blue Stripe Low",
    category: "Street style",
    price: 20,
    currency: "USD",
    image: "/images/terrace-blue.webp",
    alt: "Pale blue and white striped low-top sneakers worn outdoors in Bulawayo",
    sku: "TN-DEMO-06",
    sizes: [37, 38, 39, 40, 41, 42, 43],
    stock: "unknown",
    status: "illustrative",
    colour: "Sky / white",
    source: "https://www.tiktok.com/@tnfootwear0/video/7695307689496268052",
    sourceDate: "2026-10-11",
  },
];
