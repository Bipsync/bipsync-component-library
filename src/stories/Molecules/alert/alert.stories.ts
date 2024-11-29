import type { Meta, StoryObj } from '@storybook/web-components';
import './alert';
import { html } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import { variantKeys } from './alert';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import { withinShadowRoot } from '../../../utils/test.util';

const meta: Meta = {
	title: 'BCL/Molecules/alert',
	argTypes: {
		variant: {
			options: variantKeys,
			control: { type: 'inline-radio' },
		},
	},
	args: { onDismiss: fn() },
	decorators: [withActions],
	beforeEach: ({ args, canvasElement }) => {
		canvasElement.addEventListener('alert-dismissed', (e) =>
			args.onDismiss(e)
		);
	},
	render: (args) => {
		return html` ${renderAlert(args)} `;
	},
};

const renderAlert = (args) => {
	return html` <bipsync-alert
		data-testid="alert"
		variant=${args.variant}
		title="${args.title}"
		?dismissable=${args.dismissable}
	>
		<div slot="alert-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua.
		</div>
	</bipsync-alert>`;
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
	args: {
		variant: 'success',
		title: 'Success Alert',
	},
};

export const Error: Story = {
	args: {
		variant: 'error',
		title: 'Error Alert',
	},
};

export const Warning: Story = {
	args: {
		variant: 'warning',
		title: 'Warning Alert',
	},
};

export const Info: Story = {
	args: {
		variant: 'info',
		title: 'Info Alert',
	},
};

export const Dismissable: Story = {
	args: {
		variant: 'success',
		title: 'Dismissable Alert',
		dismissable: true,
	},
};

export const Sizing: Story = {
	args: Dismissable.args,
	render: (args) => {
		return html`
			<div style="margin:20px;width:200px;">${renderAlert(args)}</div>
			<div style="margin:20px;width:400px;">${renderAlert(args)}</div>
			<div style="margin:20px;width:800px;">${renderAlert(args)}</div>
		`;
	},
};

export const DismissAlertTest: Story = {
	args: {
		variant: 'success',
		title: 'Dismissable Alert',
		dismissable: true,
	},
	play: async ({ canvasElement, args }) => {
		// Arrange
		const canvas = within(canvasElement);

		canvasElement.addEventListener('alert-dismissed', (e) =>
			args.onDismiss(e)
		);

		const componentUnderTest = await withinShadowRoot(
			canvasElement,
			'bipsync-alert'
		);

		// Act
		await userEvent.click(
			await componentUnderTest.findByTestId('alert-dismiss')
		);

		// Assert
		await expect(args.onDismiss).toHaveBeenCalled();
	},
};
