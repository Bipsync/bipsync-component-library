import type { Meta, StoryObj } from '@storybook/web-components';
import './icon-button';
import { html, TemplateResult } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import { repeat } from 'lit/directives/repeat.js';
import { CloseIcon } from '../../assets/Icons';

const meta: Meta = {
	title: 'BCL/Atoms/icon-button',
	decorators: [withActions],
	parameters: {
		actions: {
			handles: ['click icon-button'],
		},
	},
	render: (args) => {
		return html`<icon-button ?disabled="${args.disabled}">
			<div slot="icon">${html`<i class="fa-solid fa-xmark"></i>`}</div>
		</icon-button>`;
	},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	args: {
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
