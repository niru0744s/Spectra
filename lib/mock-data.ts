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
    slug: "eclipse-aviators",
    name: "Eclipse Aviators",
    subtitle: "Matte Black",
    price: 145,
    rating: 4.8,
    reviews: 124,
    frameColorLabel: "Matte Black",
    colors: [
      { name: "Matte Black", hex: "#1A1A1A" },
      { name: "Silver Titanium", hex: "#C0C0C0" },
      { name: "Champagne Gold", hex: "#D4AF37" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSh1Nj219JeEOUJ8zU-n66EJPqAgyvciTMu-lJFpTUKH_15pBSTpQnqF6gFeOHjIe9auamRaBAQjCY6bcVKF8dC6H76Y54YfTVfufvk6DsgigdBhW52RLuqi9kmoBF_efSreWWOEZnapCylacCY-D3OtjZos8YdSiDlqoeb3FAgy3eq15itDl8ou_5FSjbRBZKnMH1G29zeB-EY8jRT2jMEPrWiUcDcrkUV2GF7mNqRnJbp7F_zkrWag0F8-hLC4Bcf7O-k_37yQ",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOMV97UHfcFMUJNyV-zPzNxQgKQdOp-bA7SXziJ-lsbyGDXdH4PYeJwz9yTOuUvmu-FxSwaAde-CD_FTxrFMOzOyVZKZA7vN3-NWbo6aumJ5koVDjuZP5Y17vRYTveOrwqhz86QwXaWHGoQopBqvqLEP9qzfvcQEkQf8YyqWusYH9o8yjRH3zMNbCXe6c4yVvqCz5mkvkWZenM5-UZRLU7BACCZrsAiFoIsT6U58kXLre_95HB3x3IHJS0OVB6ih24kWcmdzFK6Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUvLh6AwfKyfSd-szIhXFRPm8r3QOCezgoyQ8qpm6-hBafPpF8mKJzUSe_RVpi3btxa52h7G1gQw8b7NjkuNBe9UIEP6z8xu61CCEO8EvODrnr-9zl4c9KYHFUGiFVLatbsruPog6d3wuj74Y8uW9qrtzPhRBb1-UBDcMIK-EyMr0J9gNrxcSkDYBOSDI5ZVE2634yVHfAIIrqy1ToNO-tgCFPrgN3VC4PRl925-RbSsqbxcYn2nNqFWkJTwFkmlbs_pjXpZq6yQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN6ldWXFI2OQXhB3Xpod89vSexqVyr-I97ugRh-lfeASWiL5I8xL7c-cHFI4wovt1YBsD5K6Gi6lY4fOjgJc7pZt1kh7oC6YXYTBRmEY8gA5kXHHlIYFRfIaVvqk1LLJ_HhbwkskaPf0PYESA7I99EoLB4gfjeQcMo9Vlfxump20WMbpz35C8Mv3r7ntBHqRWyr46G8tSXIuAIS6d6gJfMNWRucwUUndxiTyYDXjFK7XyIbjjWS6aV4Hf_H5S_5Mpvy0Z8L8-HlA",
    ],
    description:
      "Engineered for absolute optical clarity. Eclipse Aviators blend a classic silhouette with ultra-lightweight aerospace-grade titanium for effortless all-day wear.",
    specs: [
      "Material: Aerospace-grade Titanium",
      "Lens: CR-39 with anti-reflective coating",
      "UV Protection: 100% UVA/UVB",
      "Weight: 18 grams",
    ],
    fit: "Lens Width: 58mm | Bridge: 15mm | Temple: 140mm. Designed for medium to large faces.",
    hasTryOn: true,
  },
  {
    id: "p2",
    slug: "kyoto-round",
    name: "The Kyoto",
    subtitle: "Round / Obsidian",
    price: 245,
    rating: 4.7,
    reviews: 128,
    frameColorLabel: "Obsidian",
    colors: [{ name: "Obsidian", hex: "#202020" }],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO_o7q4m1tbIfTeZAPoKNcK0n4_gfFgz0kC-rr01Ag0yFjtks99cEAAPs6LlIl61Sa6r8BuWHyAznknE0zzVn2LwL9Z_La-ncjOmHAYxcHadHhsCYfgGd0aSg9DQ-Sy62dBJkk2kbVONRGa7ef8mmc1snnxlNZp6jcx5V5sO94mFOx4gcqtTurW2k2kfBkdfpAN5e5wiv_RWtEUkpjWVW-rOWqriyLJ7MJUkkurUE3UgcBdJIKdntapS1iq32f9x0fvGyf3avoTQ",
    gallery: [],
    description: "Rounded titanium build with all-day comfort.",
    specs: [],
    fit: "Medium fit",
    hasTryOn: true,
  },
  {
    id: "p3",
    slug: "atlas-aviator",
    name: "The Atlas",
    subtitle: "Gold / Amber",
    price: 280,
    rating: 5,
    reviews: 45,
    frameColorLabel: "Gold",
    colors: [{ name: "Gold", hex: "#D4AF37" }],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDlZNskTe9P87hQLmXAMewn6eX2BBnNIpYI2H3Zao5ci9DKm9_PxStLRi5uiBM43rbZIpSmD98tp2PrenMy25ER3sg1KPcD0YtuJfNaFhYZUbR0dx9OVD5TQilT3qT-TKmTr8og0rtSX61NBKFL9uKIRorRCzc_3rYheaaQodz-CfIbWevfe7ntRUmOSI6LpwjVJ-Wid9cpy7LomhXUNtbxnm_qaxm38ss0qxC7Qp4q5W2ikzAuUoOJ_cl5tWF1wyKWWyrxCnYEg",
    gallery: [],
    description: "Classic aviator geometry with a warm tint.",
    specs: [],
    fit: "Wide fit",
    hasTryOn: false,
  },
  {
    id: "p4",
    slug: "oslo-geometry",
    name: "The Oslo",
    subtitle: "Tortoise / Polarized",
    price: 220,
    rating: 4.3,
    reviews: 89,
    frameColorLabel: "Tortoise",
    colors: [{ name: "Tortoise", hex: "#7A4B2A" }],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLJDgK6fqsCwSePv_rCQwBjt1NkzWJI3hCyb7srEz_Yep4E7ElcVaTqlnmYVFggpHlBFQ4uDv5XAASsxtyTsSR2h7HIrzOeq5D4WN7Yr8QN0u8kNUQ8rPCSvREOBo0-Yb3knS7elzJFhIO2kyRgsyZMBR_GQ2LOA9koJ6QSOD_39RK0Fx9QJJjHrsgMjkJKh_MDdxMMw3H8pmEoV1o2GUA4EUL3bwu_kUV32u3xcxIJ4qjL94ZYnV6e6UJizjt3BCmGHy801cTrg",
    gallery: [],
    description: "Bold silhouette with structured contours.",
    specs: [],
    fit: "Wide fit",
    hasTryOn: true,
  },
];

export const cartItems: CartItem[] = [
  {
    id: "c1",
    productSlug: "kyoto-round",
    title: "Aura Frame",
    variant: "Matte Black / Standard Fit",
    quantity: 1,
    unitPrice: 245,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDU6nAgzZqfjQNpZGXlfTPjbroFjd7I7DZmddYy4AxeuoOC-LOmxYrmrDmmHKlyrVt2DSrpPEX2ZQwu36rMXI6v8eNCfly_St_gY7CsJjFxLn3Sta5Of5ItfaRxNBA-cYpph2xTugvWdYxHV2H5vsLkhtt865pK8n8ztpzkEZJ4h7dlmeof_gZdaCS-oIofTgrs0m27TfZutIi4qD7FO2G0ME0px5S5zkd48jCkOCLjivFKOdMiBinMt0OUmK8C7w9cd61eWP6u9w",
  },
  {
    id: "c2",
    productSlug: "atlas-aviator",
    title: "Nova Sun",
    variant: "Crystal / Wide Fit",
    quantity: 1,
    unitPrice: 295,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpmScev8TdOyeQwcVNLcwSdbBOm5uNMcwxBgglOeTpqj8WrHHG6O2ZtjizniZ-Ly9y7RBlD7txZFDVMsEq_3Gx0IKnv_afYM8ODh2_uab1mDVLYkNVwfts_4My4P5jMgOHNT80De1bUMZqghUi1laXWzk4aAhCKL6vzzO-B_1xjoGdV5p4Wx2IQ802fqHeYTW0aqHYIsK8GyPZWiKwc0mAZiq_LaPtJX9mmiOG09YsJX3vV26wmslKLVqsM_AXKw7k7gd7Pbvv5A",
  },
];

export const orders: Order[] = [
  {
    id: "SP-8829",
    productName: "Model X1 - Matte Obsidian",
    status: "Shipped",
    placedOn: "Oct 24, 2023",
    total: 345,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFHHeAlcUy0qb1Du7SW0fGmBAdidMXSJzn3HTXyh5DdSGMJjsjnyQ74f1H538ez92ulavbkqy0yV3xPoJM_2CgrXBcCsXlfVu8lPNAAVlvALSQ6lL-j6BROhZ-XWLc5YojMJ9Za8atdQ8ihdxoWH05JTGiwtk-VgVl0sS9PrXZKz7CE0kQ1w8u6WHWf3ledZOuk4UjTcQ4r3sD2MU35W4uIZEnyQ-1jBZ1Qir21JKFAybTHfTQNBA9NJkTElvc-QvD31DQ1Nt8pA",
  },
  {
    id: "SP-7401",
    productName: "Visionary - Crystal Clear",
    status: "Delivered",
    placedOn: "Sep 12, 2023",
    total: 290,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSLOjyBRxg0RSmV07RYvRVgsQcuvtsha6WiQ5itcXSbD0MN69OdoJED6eLDTUSZFe___bsJkBHJ-F8oFZjA0jgnINARJh9zVgUAfpxyOypnlxF5nZkVf58ztmmPQVclNaIlE49l8GqxoEzv05Tn2L1nvUs8L3TGd3nGDUH5gsJ0L61ILkLeaxE-WW5wg_GgrUpbBrBKzFezCvP3MNsLn2IUprw2VLxrAxmC1P4NbH4nKl5uyFDicU45lj0mAvRw18iLWMF1EWFpw",
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
