/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl:': '1280px',
      '2xl:': '1536px'
    },
    colors: {
      'green': '#5DBB63', // Fern
      'shamrock': '#03AC13', // Shamrock
      'ongreen': '#03C04A', // Parakeet
      'black': '#030104', // Onyx
      'white': '#FEFEFE', // Daisy
      'red': '#ED2939', // Imperial
      'onred': '#D0312D', // Red
      'blue': '#3944BC', // Blue
      'sky': '#6caddf', // Mancity color
      'yello': '#F9E076', // Macaroon
      'puple': '#9146FF', // Puple
      // 'gray': '#C5C6D0',
      'gray': '#A3B5C0',
      'Lime': '#F8FFEC', // Lime
      'BlackEel': '#463E3F', // Black Eel
      'sugar': '#F3EAAF', // Sugar Cookie
      'mint': '#99EDC3', // Mint
    },
    extend: {
      fontFamily: {
        noto: ['noto', 'sans-serif'],
        roboto: ['roboto', 'sans-serif']
      }
    }
  },
  plugins: [],
}
