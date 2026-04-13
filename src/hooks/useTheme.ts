import { useColorScheme } from "nativewind";

export const useTheme = () => {
  // NATIVEWIND THEME HOOK
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // EXPOSED THEME STATE & METHODS
  return {
    theme: colorScheme,
    toggleTheme: toggleColorScheme,
    isDark: colorScheme === "dark",
  };
};
