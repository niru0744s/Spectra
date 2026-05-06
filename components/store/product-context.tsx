"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, products as initialMockProducts } from "@/lib/mock-data";
import toast from "react-hot-toast";

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mirrorcart_products");
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (e) {
        setProducts(initialMockProducts);
      }
    } else {
      setProducts(initialMockProducts);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mirrorcart_products", JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    toast.success(`${product.name} created successfully`);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updatedProduct : p))
    );
    toast.success("Product updated successfully");
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  // We only render children once the data is loaded from localStorage 
  // to prevent hydration mismatches and show accurate data.
  if (!isLoaded) {
    return null; // Or a simple loader
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
