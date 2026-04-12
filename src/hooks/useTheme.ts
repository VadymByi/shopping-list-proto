import { useColorScheme } from "nativewind";

export const useTheme = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  return {
    theme: colorScheme,
    toggleTheme: toggleColorScheme,
    isDark: colorScheme === "dark",
  };
};
