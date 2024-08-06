import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartContextProviderProps {
  children: React.ReactNode;
}

interface CartContextType {
  cart: Array<any>;
  setCart: React.Dispatch<React.SetStateAction<any>>;
}

const defaultContextValue: CartContextType = {
  cart: [],
  setCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultContextValue);

export const CartProvider: FC<CartContextProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
    }),
    [cart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
