import { waitFor } from '@testing-library/dom';
import { expect, within } from '@storybook/test';

export async function withinShadowRoot(
	customElement: HTMLElement,
	selector: string
) {
	const component = customElement.querySelector(selector);

	await waitFor(
		() => {
			const shadowRootFirstEl = component?.shadowRoot
				?.firstElementChild as HTMLElement;
			return expect(shadowRootFirstEl).toContainElement(
				shadowRootFirstEl
			);
		},
		{ timeout: 1000 }
	);

	// force type HTMLElement to ignore the type checking of the "within" function
	return within(component?.shadowRoot as any as HTMLElement);
}
