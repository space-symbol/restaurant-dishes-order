module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@headlessui/react/dist/**/*.js",
  ],
  theme: {
    container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
    extend: {
      width: {
        '128': '32rem',
        '144': '36rem',
      },
      colors: {
        'restaurant-red': 'hsl(353, 82%, 57%)',
        'restaurant-orange': 'hsl(24, 97%, 81%)',
        'restaurant-peach': 'hsl(20, 93%, 91%)',
        'restaurant-yellow': 'hsl(52, 95%, 90%)',
        'restaurant-dark': 'hsl(222, 25%, 14%)',
        'restaurant-gray': 'hsl(216, 4%, 56%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}