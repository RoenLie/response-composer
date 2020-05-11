import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./rich-text-editor.scss";
import view from "./view";

createCustomElement("rich-text-editor", {
	renderer: { type: snabbdom },
	view,
	initialState: {},
	properties: {},
	styles,
});
