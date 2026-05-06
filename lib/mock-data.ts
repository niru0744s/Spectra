export type Swatch = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  reviews: number;
  frameColorLabel: string;
  colors: Swatch[];
  image: string;
  gallery: string[];
  description: string;
  specs: string[];
  fit: string;
  hasTryOn: boolean;
};

export type CartItem = {
  id: string;
  productSlug: string;
  title: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  image: string;
};

export type Order = {
  id: string;
  productName: string;
  status: "Shipped" | "Delivered";
  placedOn: string;
  total: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "clarifying-bha-wash",
    name: "Clarifying BHA 2% Gel Wash",
    subtitle: "Daily Exfoliant",
    price: 28,
    rating: 4.8,
    reviews: 124,
    frameColorLabel: "Size",
    colors: [
      { name: "150ml", hex: "#FFFFFF" },
      { name: "250ml", hex: "#F0F0F0" },
    ],
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=600",
    gallery: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=600"
    ],
    description:
      "Deep-cleansing salicylic acid targets breakouts and unclogs pores without stripping moisture. Formulated with soothing botanical extracts to balance sebum production.",
    specs: [
      "Key Ingredient: 2% Salicylic Acid (BHA)",
      "Best for: Oily, Acne-Prone Skin",
      "Cruelty-free & Vegan",
      "Fragrance-free",
    ],
    fit: "Use morning and night. Massage gently onto damp skin for 60 seconds before rinsing.",
    hasTryOn: true, // Used to denote if AI analysis is applicable
  },
  {
    id: "p2",
    slug: "niacinamide-drops",
    name: "Niacinamide + Zinc Mattifying Drops",
    subtitle: "Pore-Refining Serum",
    price: 34,
    rating: 4.7,
    reviews: 128,
    frameColorLabel: "Size",
    colors: [{ name: "30ml", hex: "#FFFFFF" }],
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600&h=600",
    gallery: [],
    description: "A lightweight serum that visibly regulates sebum production and refines pore texture.",
    specs: ["10% Niacinamide", "1% Zinc PCA"],
    fit: "Apply 2-3 drops to entire face morning and evening.",
    hasTryOn: true,
  },
  {
    id: "p3",
    slug: "hydro-plump",
    name: "Hydro-Plump Moisture Surge",
    subtitle: "Hyaluronic Acid",
    price: 42,
    rating: 5,
    reviews: 45,
    frameColorLabel: "Size",
    colors: [{ name: "50ml", hex: "#FFFFFF" }],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=600",
    gallery: [],
    description: "Multi-molecular hyaluronic acid instantly hydrates and plumps for a dewy, glass-skin finish.",
    specs: ["Multi-weight Hyaluronic Acid", "Vitamin B5"],
    fit: "Apply to damp skin for maximum absorption.",
    hasTryOn: true,
  },
  {
    id: "p4",
    slug: "retinol-renewal",
    name: "Retinol 0.5% Night Renewal",
    subtitle: "Anti-Aging Cream",
    price: 65,
    rating: 4.9,
    reviews: 89,
    frameColorLabel: "Size",
    colors: [{ name: "50ml", hex: "#FFFFFF" }],
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600&h=600",
    gallery: [],
    description: "Accelerates cellular turnover to smooth fine lines and restore youthful elasticity while you sleep.",
    specs: ["0.5% Encapsulated Retinol", "Peptide Complex"],
    fit: "Use PM only. Start with 2-3 times a week.",
    hasTryOn: true,
  },
];

export const cartItems: CartItem[] = [
  {
    id: "c1",
    productSlug: "clarifying-bha-wash",
    title: "Clarifying BHA 2% Gel Wash",
    variant: "150ml",
    quantity: 1,
    unitPrice: 28,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "c2",
    productSlug: "hydro-plump",
    title: "Hydro-Plump Moisture Surge",
    variant: "50ml",
    quantity: 1,
    unitPrice: 42,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

export const orders: Order[] = [
  {
    id: "SP-8829",
    productName: "Clarifying BHA 2% Gel Wash",
    status: "Shipped",
    placedOn: "Oct 24, 2023",
    total: 28,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "SP-7401",
    productName: "Hydro-Plump Moisture Surge",
    status: "Delivered",
    placedOn: "Sep 12, 2023",
    total: 42,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

export const userProfile = {
  name: "Alex Mercer",
  tier: "Premium Member",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC62Pg369eGxy5hCgW5yXf12dGs37Nb6vi6CAG2TeaIkUZYAQFIANgHmEMyt9ski4ECUxBzdHhQlP-fxzD4_Xj-at8oyu25AxwyYdCyROWuWjg7adaX4hB7iksSCmRx1_N6CuMRmMhnk8prlN3tpYIHrY0xr7TIzLTiqJpWJxTuGoxklWMflQYby8jhkOUBgKadVk0RKzqUqOe17nqhJAptatkSZ-Pl92Coxq9jPDWXAs7XHCkwkXVQuSbmgyRliJOK8xn6YmEDSg",
};

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
