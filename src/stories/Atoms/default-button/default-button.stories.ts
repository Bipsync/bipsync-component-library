import type { Meta, StoryObj } from '@storybook/web-components';
import './default-button';
import { html } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import { themeKeys } from './default-button';
import { repeat } from 'lit/directives/repeat.js';

const meta: Meta = {
	title: 'BCL/Atoms/default-button',
	argTypes: {
		variant: {
			options: ['primary', 'secondary', 'tertiary'],
			control: { type: 'inline-radio' },
		},
		size: {
			options: ['xsmall', 'small', 'regular', 'large'],
			control: { type: 'inline-radio' },
		},
		colorTheme: {
			options: themeKeys,
			control: { type: 'inline-radio' },
		},
	},
	decorators: [withActions],
	parameters: {
		actions: {
			handles: ['click'],
		},
	},
	render: (args) => {
		return html` ${renderButton(args)} `;
	},
};

const renderButton = (args) => {
	return html` <default-button
		label=${args.label}
		variant=${args.variant}
		size=${args.size}
		color-theme=${args.colorTheme}
		?disabled=${args.disabled}
	></default-button>`;
};

export default meta;
type Story = StoryObj;

const baseDefaultButtonArgs = {
	size: 'regular',
	disabled: false,
};

export const Primary: Story = {
	args: {
		...baseDefaultButtonArgs,
		label: 'Primary',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		...baseDefaultButtonArgs,
		label: 'Secondary',
		variant: 'secondary',
	},
};

export const Tertiary: Story = {
	args: {
		...baseDefaultButtonArgs,
		label: 'Tertiary',
		variant: 'tertiary',
	},
};

export const Disabled: Story = {
	render: (args) => {
		return html`<div style="display:flex; gap:20px; align-items:center;">
			${renderButton({ ...Primary.args, ...args })}
			${renderButton({ ...Secondary.args, ...args })}
			${renderButton({ ...Tertiary.args, ...args })}
		</div>`;
	},
	args: {
		disabled: true,
	},
};

export const SemanticThemes: Story = {
	render: (args) => {
		return html`
			<div>
				${repeat(
					themeKeys,
					(theme) => html`
						<div
							style="display:flex; gap:20px; align-items:center;margin-bottom:20px;"
						>
							${renderButton({
								...Primary.args,
								...args,
								colorTheme: theme,
							})}
							${renderButton({
								...Secondary.args,
								...args,
								colorTheme: theme,
							})}
							${renderButton({
								...Tertiary.args,
								...args,
								colorTheme: theme,
							})}
						</div>
					`
				)}
			</div>
		`;
	},
};
