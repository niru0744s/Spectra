"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StoreShell } from "@/components/store/store-shell";
import { useProducts } from "@/components/store/product-context";
import { Product } from "@/lib/mock-data";

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      id: "p" + Date.now(),
      slug: "new-product-" + Date.now(),
      name: "",
      subtitle: "",
      price: 0,
      rating: 5,
      reviews: 0,
      frameColorLabel: "Size",
      colors: [],
      gallery: [],
      specs: [],
      fit: "",
      hasTryOn: false,
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=600",
      description: ""
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct || !currentProduct.id) return;
    
    // Check if exists
    const exists = products.some((p) => p.id === currentProduct.id);
    if (exists) {
      updateProduct(currentProduct.id, currentProduct as Product);
    } else {
      addProduct(currentProduct as Product);
    }
    
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <StoreShell active="shop">
      <section className="spectra-container py-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-medium text-[#1b1b1c]">Product Management</h1>
          <button 
            onClick={handleAddNew}
            className="rounded-[12px] bg-[#1E2A44] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#08152e]"
          >
            Add New Product
          </button>
        </div>

        {isEditing && currentProduct ? (
          <div className="mb-12 rounded-[12px] border border-[#E8E8E8] bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-medium text-[#1b1b1c]">
              {products.some(p => p.id === currentProduct.id) ? "Edit Product" : "New Product"}
            </h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-zinc-700">Name</label>
                <input 
                  type="text" 
                  value={currentProduct.name || ""} 
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-zinc-300 p-2 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">Slug</label>
                <input 
                  type="text" 
                  value={currentProduct.slug || ""} 
                  onChange={(e) => setCurrentProduct({...currentProduct, slug: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-zinc-300 p-2 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">Price ($)</label>
                <input 
                  type="number" 
                  value={currentProduct.price || 0} 
                  onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                  className="mt-1 block w-full rounded-md border border-zinc-300 p-2 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">Image URL</label>
                <input 
                  type="text" 
                  value={currentProduct.image || ""} 
                  onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-zinc-300 p-2 shadow-sm"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700">Description</label>
                <textarea 
                  value={currentProduct.description || ""} 
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-zinc-300 p-2 shadow-sm"
                  rows={3}
                  required
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-[12px] border border-[#E8E8E8] px-6 py-2.5 text-sm font-medium text-[#1E2A44] transition-all hover:bg-[#FAFAF8]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="rounded-[12px] bg-[#1E2A44] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#08152e]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[12px] border border-[#E8E8E8] bg-white shadow-sm">
            <table className="w-full text-left text-sm text-zinc-600">
              <thead className="bg-[#FAFAF8] text-xs uppercase text-zinc-700 border-b border-[#E8E8E8]">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[#E8E8E8] hover:bg-[#f6f3f2]">
                    <td className="px-6 py-4 font-medium text-[#1b1b1c] flex items-center gap-4">
                      <img src={product.image} className="w-12 h-12 rounded object-cover" alt={product.name} />
                      {product.name}
                    </td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="font-medium text-[#1e2a44] hover:underline"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this product?")) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </StoreShell>
  );
}
