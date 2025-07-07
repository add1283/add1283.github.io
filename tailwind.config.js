/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./node_modules"
  ],
  theme: {
    extend: {
      fontFamily: {
        'kumbh': ['Kumbh Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'work': ['Work Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
  // CSS boyutunu optimize et
  purge: {
    enabled: true,
    content: [
      './src/**/*.{html,ts}',
      './src/**/*.component.{html,ts}',
    ],
    options: {
      safelist: [
        'animate-pulse',
        'animate-bounce',
        'animate-spin',
        'animate-ping',
        'bg-gradient-to-r',
        'bg-gradient-to-br',
        'bg-gradient-to-l',
        'from-purple-400',
        'to-pink-400',
        'via-purple-900',
        'from-blue-400',
        'from-blue-500',
        'to-purple-600',
        'via-purple-400',
        'to-blue-600',
        'bg-blue-500',
        'bg-purple-600'
      ]
    }
  }
}
