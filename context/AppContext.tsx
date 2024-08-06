import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  type: string;
  toastText: string;
  theme: string;
  isLoading: boolean;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setToastText: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: AppContextType = {
  type: "common",
  toastText: "",
  theme: "dark",
  isLoading: false,
  setType: () => {},
  setTheme: () => {},
  setToastText: () => {},
  setIsLoading: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [type, setType] = useState<string>("common");
  const [toastText, setToastText] = useState<string>("");
  const [theme, setTheme] = useState<string>("dark");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      type,
      toastText,
      theme,
      isLoading,
      setType,
      setToastText,
      setTheme,
      setIsLoading,
    }),
    [isLoading, theme, type, toastText]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
