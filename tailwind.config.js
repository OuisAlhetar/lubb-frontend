/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            extend: {
                colors: {
                    primary: '#5D3FD3',
                    secondary: '#1E1E1E'
                }
            }
        }
    },
    plugins: []
}