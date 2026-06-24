import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    restaurantId: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (newItem) => set((state) => {
                // Ensure customer only orders from one restaurant at a time
                if (state.items.length > 0 && state.items[0].restaurantId !== newItem.restaurantId) {
                    return { items: [newItem] }; // Clear cart and add new if different restaurant
                }

                const existingItem = state.items.find(item => item.id === newItem.id);
                if (existingItem) {
                    return {
                        items: state.items.map(item => 
                            item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
                        )
                    };
                }
                return { items: [...state.items, newItem] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter(item => item.id !== id)
            })),
            clearCart: () => set({ items: [] }),
            getTotal: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
        }),
        {
            name: 'foodapp-cart',
        }
    )
);
