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
				d="M16 224h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm416 192H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-384H172.83A12.82 12.82 0 0 0 160 44.83v38.34A12.82 12.82 0 0 0 172.83 96h262.34A12.82 12.82 0 0 0 448 83.17V44.83A12.82 12.82 0 0 0 435.17 32zm0 256H172.83A12.82 12.82 0 0 0 160 300.83v38.34A12.82 12.82 0 0 0 172.83 352h262.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288z"
				/>
		</svg>`;
	}

	return (
		<div>
			<svg id="icon" />
		</div>
	);
};

createCustomElement("icon-align-right", {
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
