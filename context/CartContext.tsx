"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  cartId: string;          // 🔑 ID unik per item keranjang
  paketId: number;
  nama: string;
  harga: number;
  tanggal: string;
  jumlahOrang: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  updateItem: (cartId: string, data: Partial<CartItem>) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // LOAD dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // SAVE ke localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
  };

  const removeFromCart = (cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const updateItem = (cartId: string, data: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, ...data } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus di dalam CartProvider");
  return ctx;
};
