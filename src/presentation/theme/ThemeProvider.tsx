import { createContext, ReactNode, useContext, useState } from 'react';
import { colors, ThemeColors } from './Colors';
import { fontSizes } from './FontSizes';
import { radius } from './Radius';
import { spacing } from './Spacing';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSizes: typeof fontSizes;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const value: ThemeContextValue = {
    mode,
    toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    colors: colors[mode],
    spacing,
    radius,
    fontSizes,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme precisa estar dentro de um ThemeProvider');
  return ctx;
}
