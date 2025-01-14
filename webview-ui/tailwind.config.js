/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./settings.html"
  ],
  theme: {
    extend: {
      colors: {
        'vscode-bg': '#1e1e1e',
        'vscode-fg': '#cccccc',
        'vscode-border': '#3c3c3c',
        'vscode-hover': '#2a2d2e',
        'vscode-active': '#37373d',
        'vscode-button': '#4d4d4d',
        'vscode-link': '#229ef5',
      },
    },
  },
  plugins: [],
} 