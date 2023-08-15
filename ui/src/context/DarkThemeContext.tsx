import { createContext, ReactNode, useEffect, useState } from "react";
interface ThemeContext {
  toggleTheme: () => void;
  darkMode: boolean;
}
export const DarkThemeContext = createContext<ThemeContext>({
  toggleTheme: () => {},
  darkMode: false,
});

export const DarkThemeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const theme = localStorage.getItem("darkMode") || "false";
  const [darkMode, setDarkTheme] = useState<boolean>(JSON.parse(theme));
  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};
