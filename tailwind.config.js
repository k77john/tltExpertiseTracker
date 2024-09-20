/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-color': '#7A9E3E',
                'secondary-color': '#dbeafe',
                'white-color': '#ffffff',
                'light-gray-color': '#e5e7eb',
                'body-text-color': '#4b5563',
                'black-color': '#27272a',
            },

            keyframes: {
                lineAnim: {
                    '0%': { left: '-40%' },
                    '50%': { left: '20%', width: '80%' },
                    '100%': { left: '100%', width: '100%' },
                },
            },
            animation: {
                lineAnim: 'lineAnim 1s linear infinite',
            },
            borderRadius: {
                custom: '20px',
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities(
                {
                    '.line-clamp-2': {
                        display: '-webkit-box',
                        '-webkit-line-clamp': '2',
                        '-webkit-box-orient': 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    },
                },
                ['responsive', 'hover']
            )
        },
    ],
}
