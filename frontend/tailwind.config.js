/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        jet: {
          100: '#d6d6d6',
          200: '#adadad',
          300: '#858585',
          400: '#5c5c5c',
          500: '#333333',
          600: '#292929',
          700: '#1f1f1f',
          800: '#141414',
          900: '#0a0a0a'
        },
        'rich-black': {
          100: '#cfd0d2',
          200: '#9fa1a5',
          300: '#707377',
          400: '#40444a',
          500: '#10151d',
          600: '#0d1117',
          700: '#0a0d11',
          800: '#06080c',
          900: '#030406'
        },
        indigo: {
          100: '#eee5fe',
          200: '#dcccfd',
          300: '#cbb2fd',
          400: '#b999fc',
          500: '#a87ffb',
          600: '#8666c9',
          700: '#654c97',
          800: '#433364',
          900: '#221932'
        },
        jade: {
          100: '#d1f1e4',
          200: '#a2e3c9',
          300: '#74d4ad',
          400: '#45c692',
          500: '#17b877',
          600: '#12935f',
          700: '#0e6e47',
          800: '#094a30',
          900: '#052518'
        },
        'picton-blue': {
          100: '#d3edfb',
          200: '#a8dbf6',
          300: '#7ccaf2',
          400: '#51b8ed',
          500: '#25a6e9',
          600: '#1e85ba',
          700: '#16648c',
          800: '#0f425d',
          900: '#07212f'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      boxShadow: {
        shadowAuth: ' 2px 2px 5px #0f425d',
        shadowProgressBar: ' 0px 0px 5px #1976d2'
      }
    }
  },
  plugins: []
}
