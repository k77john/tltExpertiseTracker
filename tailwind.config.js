/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-color': '#2563eb',
                'secondary-color': '#dbeafe',
                'white-color': '#f9fafb',
                'light-gray-color': '#e5e7eb',
                'body-text-color': '#4b5563',
                'black-color': '#27272a',
            },
        },
    },
    plugins: [],
}
