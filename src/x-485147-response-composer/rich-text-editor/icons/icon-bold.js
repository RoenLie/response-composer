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
			viewBox="0 0 384 512"
			style="height: auto;
				   width: 100%;
				   color: rgba(0, 0, 0, 0.75);
				   align-self: center;
				   justify-self: center;"
			>
				<path fill="currentColor"
					d="M333.49 238a122 122 0 0 0 27-65.21C367.87 96.49 308 32 233.42 32H34a16 
					16 0 0 0-16 16v48a16 16 0 0 0 16 16h31.87v288H34a16 16 0 0 0-16 16v48a16 
					16 0 0 0 16 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 
					112h87.76a48 48 0 0 1 0 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 0 1 0 112z" />
		</svg>`;
	}

	return (
		<div>
			<svg id="icon" />
		</div>
	);
};

createCustomElement("icon-bold", {
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
