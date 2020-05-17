import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./rich-text-editor.scss";
import view from "./view";

createCustomElement("rich-text-editor", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		output: "",
		shadowRoot: "",
	},
	properties: {},
	actionHandlers: {
		[actionTypes.COMPONENT_RENDERED]: {
			effect({
				state,
				action: {
					payload: { host },
				},
				dispatch,
				updateState,
			}) {
				updateState({ shadowRoot: host.shadowRoot });
			},
		},
	},
	styles,
});
