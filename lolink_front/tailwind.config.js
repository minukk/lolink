/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      '3xl': { 'max': '1950px' },
      '2xl': {'max': '1535px'}, // @media (max-width: 1535px) { ... }
      'xl': {'max': '1200x'}, // @media (max-width: 1279px) { ... }
      'lg': {'max': '991px'}, // @media (max-width: 991px) { ... }
      'md': {'max': '767px'}, // @media (max-width: 767px) { ... }
      'sm': {'max': '575px'}, // @media (max-width: 575px) { ... }
      // new design system screen size
      'mobile': {'max': '575px'},
      // 'mobile': {'max': '767px'},
      'tablet': {'max': '992px'},
      'desktop': {'max': '1200px'},
    },
    colors: {
      'green': '#5DBB63', // Fern
      'shamrock': '#03AC13', // Shamrock
      'ongreen': '#03C04A', // Parakeet
      'black': '#030104', // Onyx
      // 'white': '#FEFEFE', // Daisy
      'red': '#ED2939', // Imperial
      'onred': '#D0312D', // Red
      'blue': '#3944BC', // Blue
      'sky': '#6caddf', // Mancity color
      'yello': '#F9E076', // Macaroon
      'puple': '#9146FF', // Puple
      // 'gray': '#C5C6D0',
      'gray': '#A3B5C0',
      'post-gray': '#8899A6',
      'border-gray': '#BCC6CF',
      'Lime': '#F8FFEC', // Lime
      'BlackEel': '#463E3F', // Black Eel
      'sugar': '#F3EAAF', // Sugar Cookie
      'mint': '#99EDC3', // Mint
      'blush': '#FEC5E5', // Blush
      'periwinkle': '#BE93D4',// Periwinkle
      'bg-1': '#AE59E6', 
      'bg-2': '#939CF0', 
      'bg-3': '#98A7D9', 
      'bg-4': '#9CC5F0', 
      'bg-5': '#95D2E6',
      // design system color,
      'primary': '#6caddf',
      'white': '#FAFAFA',
      'gray-1': '#A3B5C0',
      'gray-3': '#8899A6',
      'gray-4': '#BCC6CF',
      'gray-5': '#868E96',
    },
    extend: {
      fontFamily: {
        noto: ['noto', 'sans-serif'],
        roboto: ['roboto', 'sans-serif']
      },
      width: {
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '100' : '25rem', // 400px
        '104': '26rem', // 416px
        '108': '27rem', // 432px
        '112': '28rem', // 448px
        '116': '29rem', // 462px
        '120': '30rem', // 478px
        '124': '31rem', // 494px
        '128': '32rem', // 512px
        '132': '33rem', // 528px
        '136': '34rem', // 544px
        '140': '35rem', // 560px
        '144': '36rem', // 576px
        '148': '37rem', // 582px
        '152': '38rem', // 598px
        '156': '39rem', // 614px
        '160': '40rem', // 630px
        '320': '80rem', // 1260px,
        '332': '83rem'
      },
      height: {
        '128': '32rem',
        '160': '40rem', // 630px
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)'},
          '50%': { transform: 'translateY(-10px)'},
        },
      },
      animation: {
        bounce100: 'bounce 1s infinite',
        bounce200: 'bounce 1.1s infinite',
        bounce300: 'bounce 1.2s infinite',
        bounce400: 'bounce 1.3s infinite',
        bounce500: 'bounce 1.4s infinite',
        bounce600: 'bounce 1.5s infinite',
      },
      transitionDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
      },
    }
  },
  plugins: [],
}
