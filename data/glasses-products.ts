export type GlassesProduct = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  scaleFactor: number;
  yOffset: number;
};

export const glassesProducts: GlassesProduct[] = [
  {
    id: 1,
    slug: "eclipse-aviators",
    name: "Aviator",
    price: 99,
    image: "/assets/glasses/img1.png",
    scaleFactor: 2.2,
    yOffset: 5,
  },
  {
    id: 2,
    slug: "kyoto-round",
    name: "Round Frame",
    price: 120,
    image: "/assets/glasses/img2.png",
    scaleFactor: 2.0,
    yOffset: 8,
  },
  {
    id: 3,
    slug: "atlas-aviator",
    name: "Atlas",
    price: 140,
    image: "/assets/glasses/img3.png",
    scaleFactor: 2.1,
    yOffset: 6,
  },
  {
    id: 4,
    slug: "oslo-geometry",
    name: "Oslo",
    price: 110,
    image: "/assets/glasses/img4.png",
    scaleFactor: 2.0,
    yOffset: 7,
  },
  {
    id: 5,
    slug: "demo-style-5",
    name: "Style Five",
    price: 130,
    image: "/assets/glasses/img5.png",
    scaleFactor: 2.15,
    yOffset: 6,
  },
];

export const getGlassesProductBySlug = (slug: string) =>
  glassesProducts.find((product) => product.slug === slug);
