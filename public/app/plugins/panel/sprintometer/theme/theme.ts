export const theme2 = {
  colors: {
    brand: {
      primary: '#EE522E',
      secondary: '#6634FA',
      accent: '#391AB3',
    },

    semantic: {
      success: '#2DA222',
      warning: '#B57215',
      error: '#B12650',
      info: '#02599B',
    },

    background: {
      surface: '#FFFFFF',
      subtle: '#F9FAFB',
      muted: '#F3F4F6',
    },

    text: {
      primary: '#212226',
      secondary: '#7A7A7D',
      inverted: '#F3F0EF',
      link: '#1f62e0',
    },

    border: {
      default: '#D1D5DB',
      subtle: '#E5E7EB',
    },

    palette: {
      primaryBlue: '#3D71D9',
      lightBlue: '#6E9FFF',
      crimson: '#D10E5C',
      magenta: '#D73274',
      hotPink: '#FF5286',
      orange: '#F5B73D',
      amber: '#F8D06B',
      emerald: '#1A7F4B',
      mint: '#6CCF8E',
    },

    gray: {
      white: '#FFFFFF',
      lightest: '#F9FAFB',
      lighter: '#F3F4F6',
      light: '#E5E7EB',
      medium: '#D1D5DB',
      neutral: '#9CA3AF',
      dark: '#6B7280',
      darker: '#4B5563',
      darkest: '#374151',
      charcoal: '#1F2937',
      slate: '#111827',
      black: '#000000',
    },
  },

  spacing: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '40px',
  },

  typography: {
    fontFamily: {
      sans: "'Inter', 'Helvetica', 'Arial', sans-serif",
      mono: "'Fira Code', monospace",
    },
    fontSize: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '22px',
      '3xl': '28px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  radii: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },

  shadows: {
    xs: '0 1px 2px rgba(0,0,0,.05)',
    sm: '0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06)',
    md: '0 4px 6px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.06)',
    lg: '0 10px 15px rgba(0,0,0,.1), 0 4px 6px rgba(0,0,0,.05)',
    xl: '0 20px 25px rgba(0,0,0,.15), 0 10px 10px rgba(0,0,0,.04)',
  },

  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '450ms',
    },
    easing: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

export type Theme2 = typeof theme2;
