"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/lib/mock-data";
import toast from "react-hot-toast";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mirrorcart_cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        setCartItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mirrorcart_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productSlug === newItem.productSlug && item.variant === newItem.variant
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, { ...newItem, id: "c_" + Date.now() }];
    });
    
    toast.success(`${newItem.title} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    toast.success("Cart quantity updated");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  if (!isLoaded) return null;

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
