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
			viewBox="0 0 448 512"
			style="height: auto;
				   width: 100%;
				   color: rgba(0, 0, 0, 0.75);
				   align-self: center;
				   justify-self: center;"
			>
				<path fill="currentColor"
				d="M32 64h32v160c0 88.22 71.78 160 160 160s160-71.78
				 160-160V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H272a16
				  16 0 0 0-16 16v32a16 16 0 0 0 16 16h32v160a80 80 0 0 1-160
				   0V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H32a16 16 0 0 0-16
					16v32a16 16 0 0 0 16 16zm400 384H16a16 16 0 0 0-16 16v32a16
					 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
		</svg>`;
	}

	return (
		<div>
			<svg id="icon" />
		</div>
	);
};

createCustomElement("icon-underline", {
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
