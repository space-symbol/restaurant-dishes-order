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
    },
  },
  plugins: [require("tailwindcss-animate")],
}