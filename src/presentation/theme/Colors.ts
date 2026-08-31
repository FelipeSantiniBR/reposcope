const palette = {
  indigo: '#6366F1',
  emerald: '#22C55E',
  amber: '#F59E0B',
  rose: '#F43F5E',
  slate950: '#0B0F19',
  slate900: '#111827',
  slate800: '#1F2937',
  slate600: '#475569',
  slate400: '#94A3B8',
  slate100: '#F1F5F9',
  white: '#FFFFFF',
};

export const colors = {
  light: {
    primary: palette.indigo,
    background: palette.white,
    surface: palette.slate100,
    text: palette.slate900,
    muted: palette.slate600,
    border: palette.slate400,
    success: palette.emerald,
    warning: palette.amber,
    danger: palette.rose,
  },
  dark: {
    primary: palette.indigo,
    background: palette.slate950,
    surface: palette.slate800,
    text: palette.slate100,
    muted: palette.slate400,
    border: palette.slate600,
    success: palette.emerald,
    warning: palette.amber,
    danger: palette.rose,
  },
} as const;

export type ThemeColors = typeof colors.light;