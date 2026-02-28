/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAF6EF',
        surface: '#FFFFFF',
        ink: '#1A1A1A',
        muted: '#5E5E5E',
        border: '#E8E1D6',
        primary: '#FF4D3D',
        secondary: '#2D5BFF',
        accent: '#B8F400',
        accent2: '#FF2DAA',
        success: '#14B86A',
        warning: '#FFB020',
        danger: '#E5262A',
      },
      fontFamily: {
        display: ['Laviossa', 'system-ui', 'sans-serif'],
        cinema: ['LifeCinemaScreen', 'system-ui', 'sans-serif'],
        body: ['Newsreader', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '24px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '48px',
        '8': '64px',
      }
    },
  },
  plugins: [],
}
