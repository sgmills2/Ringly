import { extendTheme } from '@mui/joy/styles'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#fdf7f9',
          100: '#fbeff3',
          200: '#f5d7e2',
          300: '#efbfd1',
          400: '#e48faf',
          500: '#d85f8d',
          600: '#c2557f',
          700: '#a2476a',
          800: '#823855',
          900: '#6a2e45',
        },
        neutral: {
          50: '#f9f9fa',
          100: '#f4f4f5',
          200: '#e3e4e7',
          300: '#d2d4d8',
          400: '#b0b3bb',
          500: '#8e929e',
          600: '#80838e',
          700: '#6b6d77',
          800: '#55575f',
          900: '#45474e',
        },
      },
    },
  },
  fontFamily: {
    display: "'Playfair Display', var(--joy-fontFamily-fallback)",
    body: "'Lato', var(--joy-fontFamily-fallback)",
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
})

export default theme 