import { Product } from "./sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { xorDecrypt, xorEncrypt, SECRET_KEY } from "@/utils/xorCrypto";

export type BasketItem = {
  product: Product;
  quantity: number;
};

type BasketStore = {
  items: BasketItem[];
  totalItemsCount: number; // 🔥 Burada state olarak tutuyoruz
  totalPrice: number; // 🔥 Burada state olarak tutuyoruz
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
};

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItemsCount: 0, // 🔥 Başlangıç değeri
      totalPrice: 0, // 🔥 Başlangıç değeri

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          let updatedItems;
          if (existingItem) {
            updatedItems = state.items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            updatedItems = [...state.items, { product, quantity: 1 }];
          }

          return {
            items: updatedItems,
            totalItemsCount: updatedItems.reduce(
              (total, item) => total + item.quantity,
              0
            ), // 🔥 Güncellendi
            totalPrice: updatedItems.reduce(
              (total, item) =>
                total +
                (item.product.salePercentage
                  ? (item.product.price ?? 0) -
                    ((item.product.price ?? 0) * item.product.salePercentage) /
                      100
                  : (item.product.price ?? 0)) *
                  item.quantity,
              0
            ), // 🔥 Güncellendi
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const updatedItems = state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]);

          return {
            items: updatedItems,
            totalItemsCount: updatedItems.reduce(
              (total, item) => total + item.quantity,
              0
            ), // 🔥 Güncellendi
            totalPrice: updatedItems.reduce(
              (total, item) =>
                total +
                (item.product.salePercentage
                  ? (item.product.price ?? 0) -
                    ((item.product.price ?? 0) * item.product.salePercentage) /
                      100
                  : (item.product.price ?? 0)) *
                  item.quantity,
              0
            ), // 🔥 Güncellendi
          };
        }),

      clearBasket: () => set({ items: [], totalItemsCount: 0, totalPrice: 0 }), // 🔥 Hepsini sıfırla
    }),
    {
      name: "nexus-store",
      storage: {
        getItem: (name) => {
          const encoded = localStorage.getItem(name);
          if (!encoded) return null;
          try {
            const decrypted = xorDecrypt(encoded, SECRET_KEY);
            return JSON.parse(decrypted);
          } catch (e) {
            console.warn("[BasketStore] Decryption failed, resetting store.");
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          const raw = JSON.stringify(value);
          const encrypted = xorEncrypt(raw, SECRET_KEY);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
