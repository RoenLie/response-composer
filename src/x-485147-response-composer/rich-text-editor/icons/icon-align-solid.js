import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";

const view = (state) => {
	if (state.shadowRoot) {
		const svg = state.shadowRoot.getElementById("icon");
		svg.outerHTML = `
		<svg aria-hidden="true"
			focusable="false"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			style="height: auto;
				width: 100%;
				overflow: visible;
				color: rgba(0, 0, 0, 0.75);
				justify-self: center;"
			>
				<path fill="currentColor"
				d="M432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
				/>
		</svg>`;
	}

	return (
		<div>
			<svg id="icon" />
		</div>
	);
};

createCustomElement("icon-align-solid", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		shadowRoot: undefined,
	},
	actionHandlers: {
		[actionTypes.COMPONENT_RENDERED]: {
			effect({
				action: {
					payload: { host },
				},
				updateState,
			}) {
				updateState({ shadowRoot: host.shadowRoot });
			},
		},
	},
});
