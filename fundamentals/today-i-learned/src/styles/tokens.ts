// Design tokens for consistent styling
export const designTokens = {
  // Spacing scale (Tailwind-compatible)
  spacing: {
    "0": "0px",
    "1": "0.25rem", // 4px
    "2": "0.5rem", // 8px
    "3": "0.75rem", // 12px
    "4": "1rem", // 16px
    "5": "1.25rem", // 20px
    "6": "1.5rem", // 24px
    "8": "2rem", // 32px
    "10": "2.5rem", // 40px
    "12": "3rem", // 48px
    "16": "4rem", // 64px
    "20": "5rem", // 80px
    "24": "6rem" // 96px
  },

  // Typography scale
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
    base: ["1rem", { lineHeight: "1.5rem" }], // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }] // 36px
  },

  // Font weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },

  // Border radius
  borderRadius: {
    none: "0px",
    sm: "0.125rem", // 2px
    default: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px"
  },

  // Shadows
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
  },

  // Animation durations
  transitionDuration: {
    "75": "75ms",
    "100": "100ms",
    "150": "150ms",
    "200": "200ms",
    "300": "300ms",
    "500": "500ms",
    "700": "700ms",
    "1000": "1000ms"
  },

  // Easing curves
  transitionTimingFunction: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  },

  // Z-index scale
  zIndex: {
    "0": "0",
    "10": "10",
    "20": "20",
    "30": "30",
    "40": "40",
    "50": "50",
    auto: "auto"
  },

  // Opacity scale
  opacity: {
    "0": "0",
    "5": "0.05",
    "10": "0.1",
    "20": "0.2",
    "25": "0.25",
    "30": "0.3",
    "40": "0.4",
    "50": "0.5",
    "60": "0.6",
    "70": "0.7",
    "75": "0.75",
    "80": "0.8",
    "90": "0.9",
    "95": "0.95",
    "100": "1"
  }
} as const;

// Brand colors
export const brandColors = {
  primary: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#ff8a80", // Main brand color
    600: "#ff5722",
    700: "#15803d",
    800: "#166534",
    900: "#14532d"
  },

  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827"
  },

  semantic: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6"
  }
} as const;

// Component style variants
export const componentVariants = {
  button: {
    base: [
      "inline-flex items-center justify-center",
      "rounded-md border font-medium",
      "transition-all duration-200 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50"
    ],
    variants: {
      default: [
        "bg-white border-gray-300 text-gray-700",
        "hover:bg-gray-50 hover:border-gray-400",
        "focus:ring-gray-500"
      ],
      primary: [
        "bg-[#ff8a80] border-transparent text-white",
        "hover:bg-[#ff5722]",
        "focus:ring-[#ff8a80]"
      ],
      ghost: [
        "bg-transparent border-transparent text-gray-700",
        "hover:bg-gray-100",
        "focus:ring-gray-500"
      ]
    },
    sizes: {
      sm: ["px-3 py-1.5 text-sm"],
      md: ["px-4 py-2 text-sm"],
      lg: ["px-6 py-3 text-base"]
    }
  },

  input: {
    base: [
      "block w-full rounded-md border-gray-300",
      "shadow-sm transition-colors",
      "focus:border-[#ff8a80] focus:ring-[#ff8a80]",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
    ],
    variants: {
      default: ["bg-white"],
      error: [
        "border-red-300 text-red-900",
        "focus:border-red-500 focus:ring-red-500"
      ]
    },
    sizes: {
      sm: ["px-3 py-1.5 text-sm"],
      md: ["px-3 py-2 text-sm"],
      lg: ["px-4 py-3 text-base"]
    }
  }
} as const;

// Layout breakpoints (mobile-first)
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
} as const;

// Container max-widths
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
} as const;
