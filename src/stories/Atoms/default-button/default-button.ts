import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export const themeKeys = ['default', 'error', 'success', 'warning', 'info'];
type ThemeKey = (typeof themeKeys)[number];
type ColorName = 'base' | 'hover' | 'secondaryHover' | 'textColor';
type Colors = Record<ColorName, string>;

/**
 * Default button element.
 *
 * @param label - The button label text
 * @param variant - The variant of the button - 'primary', 'secondary', 'tertiary'
 * @param disabled - Whether the button is disabled
 * @param size - The size of the button - 'xsmall', 'small', 'regular', 'large'
 */
@customElement('default-button')
export class DefaultButton extends LitElement {
	@property({ type: String })
	label = '';

	@property({ type: String })
	variant = 'primary';

	@property({ type: String })
	size = 'regular';

	@property({ type: Boolean })
	disabled = false;

	@property({ type: String, attribute: 'color-theme' })
	colorTheme = 'default';

	static colors: Record<ThemeKey, Colors> = {
		default: {
			base: '#1966f6',
			hover: '#1358da',
			secondaryHover: '#f3f7ff',
			textColor: 'white',
		},
		error: {
			base: '#CA2824',
			hover: '#B01E1A',
			secondaryHover: '#F9D5D4',
			textColor: 'white',
		},
		success: {
			base: '#34C759',
			hover: '#2AB04C',
			secondaryHover: '#D6F4DE',
			textColor: 'white',
		},
		warning: {
			base: '#FFA525',
			hover: '#E69521',
			secondaryHover: '#FFEDD3',
			textColor: 'white',
		},
		info: {
			base: '#D1E0FD',
			hover: '#5E94F9',
			secondaryHover: '#F3F7FF',
			textColor: '#232327',
		},
	};

	static styles = css`
		button {
			padding: 10px 12px;
			font-size: 13px;
			font-weight: 500;
			border: none;
			border-radius: 4px;
			cursor: pointer;

			&:focus {
				box-shadow: 0px 0px 0px 3px rgba(19, 88, 218, 0.2);
			}
		}

		button.xsmall {
			padding: 4px 6px;
			font-size: 10px;
		}

		button.small {
			padding: 8px 10px;
			font-size: 12px;
		}

		button.large {
			padding: 12px;
			font-size: 16px;
		}

		button.primary {
			color: var(--text-color, white);
			background-color: var(--base-button-color, #1966f6);

			&:hover {
				background-color: var(--hover-button-color, #1358da);
			}

			&:disabled {
				background-color: #9a9aa1;
			}
		}

		button.secondary {
			background-color: white;
			color: var(--base-button-color, #1966f6);
			border: 1px solid var(--base-button-color, #1966f6);

			&:hover {
				background-color: var(--secondary-hover-button-color, #f3f7ff);
			}

			&:disabled {
				color: #9a9aa1;
				border-color: #9a9aa1;
			}
		}

		button.tertiary {
			padding: 0;
			background-color: transparent;
			color: var(--base-button-color, #1966f6);

			&:hover {
				color: var(--hover-button-color, #1358da);
			}

			&:focus {
				box-shadow: none;
			}

			&:disabled {
				color: #9a9aa1;
			}
		}
	`;

	render() {
		const classes = {
			primary: this.variant === 'primary',
			secondary: this.variant === 'secondary',
			tertiary: this.variant === 'tertiary',
			xsmall: this.size === 'xsmall',
			small: this.size === 'small',
			regular: this.size === 'regular',
			large: this.size === 'large',
		};

		const theme = this.colorTheme as ThemeKey;

		const styles =
			!themeKeys.includes(theme) || theme === 'default'
				? {}
				: {
						'--base-button-color': DefaultButton.colors[theme].base,
						'--hover-button-color':
							DefaultButton.colors[theme].hover,
						'--secondary-hover-button-color':
							DefaultButton.colors[theme].secondaryHover,
						'--text-color': DefaultButton.colors[theme].textColor,
				  };

		return html`
			<button
				class="${classMap(classes)}"
				?disabled=${this.disabled}
				style="${styleMap(styles)}"
			>
				${this.label}
			</button>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'default-button': DefaultButton;
	}
}
