export const colors = {
  // Fundo e Containers
  surface: "#f6faff",
  surface_dim: "#dde4ee",
  surface_bright: "#ffffff",
  surface_container_lowest: "#ffffff",
  surface_container_low: "#ebf5ff",
  surface_container: "#dce8f5",
  surface_container_high: "#cbe6fc",
  surface_container_highest: "#cbe6fc",

  // Cores de Marca
  primary: "#001D2D",
  on_primary: "#ffffff",
  primary_container: "#003a52",
  on_primary_container: "#009909",
  primary_fixed: "#76ff64",

  // Secundárias
  secondary: "#4a6572",
  secondary_container: "#d0e8f5",
  on_secondary_container: "#001D2D",

  // Texto e Ícones
  on_surface: "#011e2e",
  on_surface_variant: "#3f5060",
  on_surface_muted: "#6b7f8e",

  // Status
  success: "#009909",
  success_container: "#e6f9e6",
  warning: "#b36200",
  warning_container: "#fff0d6",
  error: "#ba1a1a",
  error_container: "#ffdad6",
  info_container: "#dce8f5",

  outline_variant: "rgba(195, 199, 204, 0.15)",
  shadow: "rgba(1, 30, 46, 0.08)",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
