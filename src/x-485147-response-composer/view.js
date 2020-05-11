import "./rich-text-editor";

export default (state, { updateState, dispatch }) => {
	const { fieldValue, properties } = state;

	return (
		<div className="wrapper">
			<rich-text-editor component-id="richTextEditor"></rich-text-editor>

			<div id="editor"></div>

			<div
				id="textArea"
				name="textArea"
				className="textArea"
				contentEditable
				on-focusout={({ target }) => {
					// backup basic solution
					updateState({ fieldValue: target.innerText });
					//-------------------------------------------------------------------
					// let text = target.innerHTML;
					// text = text.replace(/&lt;/g, "<");
					// text = text.replace(/&gt;/g, ">");
					// text = text.replace(/<div><br><\/div>/g, "<br>");

					// text = text.replace(/<div>/g, "<br>");

					// console.log(text);

					// target.innerText = "";
					// target.innerHTML = text;

					// updateState({ fieldValue: text });
				}}
			></div>
			<button
				on-click={() => {
					dispatch("USER_FETCH_REQUESTED", {
						id: properties.sysId,
						data: `{"comments":"[code]${fieldValue.replace(
							/\n/g,
							"\\n"
						)}[/code]"}`,
					});
					console.log(fieldValue);
					state.shadowRoot.querySelector("#textArea").innerText = "";
					updateState({ fieldValue: "" });
				}}
			>
				Insert Response
			</button>
			<button on-click={() => console.log(properties.sysId)}>
				post prop caseId
			</button>
			<button on-click={() => console.log(document.URL)}>
				post document URL
			</button>
			<button
				on-click={() => {
					console.log(state.shadowRoot);
				}}
			>
				post shadowroot
			</button>
		</div>
	);
};
