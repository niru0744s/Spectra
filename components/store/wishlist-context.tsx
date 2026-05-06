"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type WishlistContextType = {
  wishlistIds: string[];
  toggleWishlist: (id: string, name: string) => void;
  isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mirrorcart_wishlist");
    if (stored) {
      try {
        setWishlistIds(JSON.parse(stored));
      } catch (e) {
        setWishlistIds([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mirrorcart_wishlist", JSON.stringify(wishlistIds));
    }
  }, [wishlistIds, isLoaded]);

  const toggleWishlist = (id: string, name: string) => {
    const isAlreadySaved = wishlistIds.includes(id);
    
    if (isAlreadySaved) {
      setWishlistIds((prev) => prev.filter((item) => item !== id));
      toast.success(`${name} removed from favorites`);
    } else {
      setWishlistIds((prev) => [...prev, id]);
      toast.success(`${name} added to favorites`);
    }
  };

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  if (!isLoaded) return null;

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
