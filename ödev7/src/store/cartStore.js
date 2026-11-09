
import { create } from "zustand";

const STORAGE_KEY = "assignment7-cart";

function getSavedItems() {
  try {
    const savedItems = localStorage.getItem(STORAGE_KEY);

    if (savedItems === null) {
      return [];
    }

    const parsedItems = JSON.parse(savedItems);

    if (!Array.isArray(parsedItems)) {
      return [];
    }

    return parsedItems.filter(
      (item) =>
        Number.isInteger(item.id) &&
        typeof item.title === "string" &&
        typeof item.price === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
  } catch (error) {
    console.error("Could not read cart:", error);
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: getSavedItems(),

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity < 1
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id
                ? { ...item, quantity }
                : item
            ),
    })),

  clear: () => set({ items: [] }),
}));

// Persist cart changes outside React components.
useCartStore.subscribe((state) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state.items)
    );
  } catch (error) {
    console.error("Could not save cart:", error);
  }
});
