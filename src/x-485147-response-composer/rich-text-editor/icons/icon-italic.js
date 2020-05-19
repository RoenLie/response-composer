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
				d="M320 48v32a16 16 0 0 1-16 16h-62.76l-80
				 320H208a16 16 0 0 1 16 16v32a16 16 0 0 1-16
				  16H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h62.76l80-320H112a16
				   16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z" />
		</svg>`;
	}

	return (
		<div>
			<svg id="icon" />
		</div>
	);
};

createCustomElement("icon-italic", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		shadowRoot: "",
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
