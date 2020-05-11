import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./container.scss";
import view from "./view";

const instance = document.URL.includes("localhost")
	? "https://cors-anywhere.herokuapp.com/https://dev84640.service-now.com"
	: "";

createCustomElement("x-485147-response-composer", {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		fieldValue: "",
		shadowRoot: "",
	},
	properties: {
		sysId: { default: null },
	},
	styles: styles,
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
		USER_FETCH_REQUESTED: createHttpEffect(
			instance + "/api/now/table/sn_customerservice_case/:id",
			{
				method: "PATCH",
				batch: false,
				headers: {
					Authorization:
						"Basic " + btoa("admin" + ":" + "Servicenow@Roen@1991"),
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				pathParams: ["id"],
				dataParam: "data", // request body
				successActionType: "USER_FETCH_SUCCESS",
				errorActionType: "USER_FETCH_ERROR",
			}
		),
		["USER_FETCH_SUCCESS"]: ({ action, updateState }) => {
			console.log("USER_FETCH_SUCCESS", action);
		},
		["USER_FETCH_ERROR"]: ({ action, updateState }) => {
			console.log("USER_FETCH_ERROR", action);
		},
	},
});
