import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Default button element.
 *
 * @param icon - The name of the icon to be rendered
 */
@customElement('icon-button')
export class DefaultButton extends LitElement {
	@property({ type: Boolean, reflect: true })
	disabled = false;

	static styles = css`
		:host([disabled]) {
			.icon-button-wrapper {
				pointer-events: none;
			}
		}
		.icon-button-wrapper {
			width: 22px;
			height: 22px;
			border-radius: 3.14px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 18px;
			color: #797981;
			cursor: pointer;

			&:hover {
				background-color: #eeeeef;
				color: #46464e;
			}
		}
	`;

	render() {
		return html`
			<div class="icon-button-wrapper">
				<slot name="icon" />
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'icon-button': DefaultButton;
	}
}
