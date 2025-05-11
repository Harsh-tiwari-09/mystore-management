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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
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
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'fade-out': {
					from: {
						opacity: '1'
					},
					to: {
						opacity: '0'
					}
				},
				'slide-in': {
					from: {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					to: {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'pulse': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.05)'
					}
				},
				'bounce-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.3)'
					},
					'40%': {
						opacity: '1',
						transform: 'scale(1.05)'
					},
					'60%': {
						transform: 'scale(0.95)'
					},
					'100%': {
						transform: 'scale(1)'
					}
				},
				'rotate-in': {
					from: {
						opacity: '0',
						transform: 'rotateY(-90deg)'
					},
					to: {
						opacity: '1',
						transform: 'rotateY(0)'
					}
				},
				'flip-in': {
					from: {
						opacity: '0',
						transform: 'perspective(400px) rotateX(90deg)'
					},
					to: {
						opacity: '1',
						transform: 'perspective(400px) rotateX(0deg)'
					}
				},
				'text-focus': {
					'0%': {
						filter: 'blur(12px)',
						opacity: '0'
					},
					'100%': {
						filter: 'blur(0px)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'shine': {
					from: {
						backgroundPosition: '200% 0'
					},
					to: {
						backgroundPosition: '-200% 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'pulse': 'pulse 2s infinite',
				'bounce-in': 'bounce-in 0.6s cubic-bezier(0.19, 1.0, 0.22, 1.0)',
				'rotate-in': 'rotate-in 0.5s ease-out',
				'flip-in': 'flip-in 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
				'text-focus': 'text-focus 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
				'float': 'float 3s ease-in-out infinite',
				'shine': 'shine 1.5s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
