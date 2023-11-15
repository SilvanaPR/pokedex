/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    borderRadius:{
      'sm': '8px',
      'md': '48px',
      'full':'9999px'
    },
    extend: {
      backgroundImage: {
        'pokedex': "url('/assets/images/background.jpg')",
        'pokemon': "url('/assets/images/pokeball.jpg')",
        'loading': "url('/assets/images/loading.png')",
       },
      backgroundColor: {
        'grass': '#48d0b0', 
        'fire': '#fb6c6c', 
        'water': '#609fb5', 
        'bug':'#c3ce75',
        'normal':'#C2C2A1',
        'flying':'#BAB0D5',
        'ghos':'#735797',
        'dark':'#942942',
        'steel':'#CCCCDE',
        'ground':'#B1736C',
        'poison':'#7C538C',
        'electric':'#FFD86F',
        'fairy':'#f469a9',
        'fighting':'#d6b591',
        'psychic':'#9B7FA6',
        'ice':'#7FCCEC',
        'rock':'#a6aab6',
        'dragon':'#F9BE00',
        'ghost' : '#F7553C',
        'unknown' : '#B2FF08',
        'shadow' : '#CF98FF',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      backgroundOpacity: ['active'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

