"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number | null;
  imageUrl?: string | null;
  quantity: number;
  stock: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  discountCode: string;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDiscount: (amount: number, code: string) => void;
  clearDiscount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [discount, setDiscountState] = useState(0);
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("auto_parts_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed.items || []);
        setDiscountState(parsed.discount || 0);
        setDiscountCode(parsed.discountCode || "");
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      "auto_parts_cart",
      JSON.stringify({ items, discount, discountCode })
    );
  }, [items, discount, discountCode, loaded]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.min(quantity, i.stock) } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountState(0);
    setDiscountCode("");
  };

  const setDiscount = (amount: number, code: string) => {
    setDiscountState(amount);
    setDiscountCode(code);
  };

  const clearDiscount = () => {
    setDiscountState(0);
    setDiscountCode("");
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discount,
        discountCode,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setDiscount,
        clearDiscount,
      }}
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
