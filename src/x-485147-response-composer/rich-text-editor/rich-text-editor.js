import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./rich-text-editor.scss";
import view from "./view";

createCustomElement("rich-text-editor", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		shadowRoot: "",
	},
	properties: {
		settings: {
			default: {
				iframeBody: "",
				buttons: [
					{
						label: "default",
						onclick: function () {
							const settings = {
								output: "",
								iframeBody: "",
								buttons: [
									{
										label: "default",
										onclick: function () {},
									},
								],
							};
							console.log("settings:", settings);
						},
					},
				],
			},
		},
	},
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
