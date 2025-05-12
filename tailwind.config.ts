
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				canvas: {
					'purple': '#9b87f5',
					'purple-dark': '#7E69AB',
					'purple-light': '#E5DEFF',
					'pink': '#FFDEE2',
					'peach': '#FDE1D3',
					'blue': '#D3E4FD',
					'gray': '#F1F0FB',
				},
				theme: {
					'impressionist': '#D6BCFA',
					'surrealist': '#8B5CF6',
					'popart': '#F97316',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'paint-splash': {
					'0%': {
						transform: 'scale(0)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'brush-stroke': {
					'0%': {
						transform: 'scaleX(0)',
						transformOrigin: 'left'
					},
					'100%': {
						transform: 'scaleX(1)',
						transformOrigin: 'left'
					}
				},
				'paint-drip': {
					'0%': {
						height: '0',
						opacity: '0.8'
					},
					'100%': {
						height: '20px',
						opacity: '0.2'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'paint-splash': 'paint-splash 0.6s ease-out forwards',
				'brush-stroke': 'brush-stroke 0.4s ease-out forwards',
				'paint-drip': 'paint-drip 1s ease-in-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out forwards'
			},
			backgroundImage: {
				'canvas-texture': 'var(--canvas-texture)',
				'impressionist-gradient': 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
				'surrealist-gradient': 'linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)',
				'popart-gradient': 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)'
			},
			fontFamily: {
				'caveat': ['Caveat', 'cursive'],
				'montserrat': ['Montserrat', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
