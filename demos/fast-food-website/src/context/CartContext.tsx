import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { itemById, DELIVERY_FEE, FREE_DELIVERY_FROM, type MenuItem } from "../data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

export type OrderType = "delivery" | "pickup";

interface CartState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderType: OrderType;
  setOrderType: (t: OrderType) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartCtx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((id: string) => {
    setQuantities((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  }, []);
  const inc = useCallback((id: string) => {
    setQuantities((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  }, []);
  const dec = useCallback((id: string) => {
    setQuantities((q) => {
      const next = { ...q };
      const v = (next[id] ?? 0) - 1;
      if (v <= 0) delete next[id];
      else next[id] = v;
      return next;
    });
  }, []);
  const remove = useCallback((id: string) => {
    setQuantities((q) => {
      const next = { ...q };
      delete next[id];
      return next;
    });
  }, []);
  const clear = useCallback(() => setQuantities({}), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartState>(() => {
    const lines = Object.entries(quantities)
      .map(([id, qty]) => ({ item: itemById(id)!, qty }))
      .filter((l) => l.item);
    const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const deliveryFee =
      orderType === "pickup" || subtotal === 0 || subtotal >= FREE_DELIVERY_FROM
        ? 0
        : DELIVERY_FEE;
    return {
      lines,
      count,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      orderType,
      setOrderType,
      isOpen,
      openCart,
      closeCart,
      add,
      inc,
      dec,
      remove,
      clear,
    };
  }, [quantities, orderType, isOpen, add, inc, dec, remove, clear, openCart, closeCart]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
