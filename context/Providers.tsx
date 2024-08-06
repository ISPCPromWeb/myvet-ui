import { AppProvider } from "./AppContext";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider>
      <CartProvider>
        <UserProvider>
          <>{children}</>
        </UserProvider>
      </CartProvider>
    </AppProvider>
  );
};
