import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
	CloseIcon,
	InfoIcon,
	SuccessIcon,
	WarningIcon,
	ErrorIcon,
} from '../../assets/Icons';

export const variantKeys = ['error', 'success', 'warning', 'info'];
type VariantKey = (typeof variantKeys)[number];
type ColorName = 'background';
type Colors = Record<ColorName, string>;

const colors: Record<VariantKey, Colors> = {
	error: {
		background: '#FCEAEA',
	},
	success: {
		background: '#EBF9EE',
	},
	warning: {
		background: '#FFF6E9',
	},
	info: {
		background: '#F3F7FF',
	},
};

const variantKeyToIcon: Record<VariantKey, TemplateResult> = {
	info: InfoIcon,
	success: SuccessIcon,
	warning: WarningIcon,
	error: ErrorIcon,
};

/**
 * Default button element.
 *
 * @param title - The alert title text
 * @param variant - The variant of the button - 'success', 'error', 'warning', 'info'
 */
@customElement('bipsync-alert')
export class Alert extends LitElement {
	@property({ type: String })
	title = '';

	@property({ type: String })
	variant = 'success';

	@property({ type: Boolean })
	dismissable = false;

	static styles = css`
		.alert-container {
			background-color: var(--background-color, #ebf9ee);
			border-radius: 4px;
			font-size: 12px;
			font-family: Helvetica Neue;
		}

		.alert-header {
			display: flex;
			justify-content: space-between;
			padding: 8px 8px 0 12px;
			align-items: center;
		}

		.header-start,
		header-end {
			display: flex;
			align-items: center;
		}

		.header-start {
			gap: 8px;
		}

		.alert-title {
			font-weight: 500;
		}

		.alert-body {
			margin-top: 4px;
			padding: 0 26px 8px 12px;
			font-weight: 400;
		}

		.close-button {
			cursor: pointer;
		}
	`;

	_onDismiss() {
		this.dispatchEvent(
			new CustomEvent('alert-dismissed', {
				bubbles: true,
				composed: true,
			})
		);
	}

	render() {
		const variant = this.variant as VariantKey;

		const styles = !variantKeys.includes(variant)
			? {}
			: {
					'--background-color': colors[variant].background,
			  };

		return html`
			<div class="alert-container" style=${styleMap(styles)}>
				<header class="alert-header">
					<div class="header-start">
						<span class="alert-icon"
							>${variantKeyToIcon[variant]}</span
						>
						<span class="alert-title">${this.title}</span>
					</div>
					<div class="header-end">
						${!this.dismissable
							? null
							: html`
									<span
										class="close-button"
										data-testid="alert-dismiss"
										@click="${this._onDismiss}"
										>${CloseIcon}</span
									>
							  `}
					</div>
				</header>
				<div class="alert-body" style=${styleMap(styles)}>
					<slot name="alert-content" />
				</div>
				<div class="alert-footer"></div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'bipsync-alert': Alert;
	}
}
