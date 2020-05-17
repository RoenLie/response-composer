export default (state, { updateState, dispatch }) => {
	const iframe = state.shadowRoot
		? state.shadowRoot.getElementById("richTextField").contentDocument
		: "";
	const body = state.shadowRoot ? iframe.getElementsByTagName("body")[0] : "";

	let showSource = false;
	let editMode = true;

	const enableEditMode = (state) => {
		iframe.designMode = state ? "On" : "Off";
	};
	const execCmd = (command, arg) => {
		iframe.execCommand(command, false, arg || null);
	};
	const toggleSource = () => {
		showSource = !showSource;
		if (showSource) body.innerText = body.innerHTML;
		else body.innerHTML = body.innerText;
	};
	const toggleEdit = () => {
		editMode = !editMode;
		if (editMode) enableEditMode(true);
		else enableEditMode(false);
	};

	if (state.shadowRoot) {
		enableEditMode(true);

		body.onpaste = function (pasteEvent) {
			var item = pasteEvent.clipboardData.items[0];

			if (item.type.indexOf("image") === 0) {
				var blob = item.getAsFile();

				var reader = new FileReader();
				reader.onload = function (event) {
					execCmd("insertImage", event.target.result);
				};

				reader.readAsDataURL(blob);
			}
		};
	}

	return (
		<div>
			<div>
				<button on-click={() => execCmd("bold")}>
					<b>B</b>
				</button>
				<button on-click={() => execCmd("italic")}>
					<i>I</i>
				</button>
				<button on-click={() => execCmd("underline")}>
					<u>U</u>
				</button>
				<button on-click={() => execCmd("strikeThrough")}>
					<s>S</s>
				</button>
				Text color:
				<input
					type="color"
					on-change={(event) => {
						execCmd("foreColor", event.path[0].value);
					}}
				/>
				Background color:{" "}
				<input
					type="color"
					on-change={(event) => {
						execCmd("hiliteColor", event.path[0].value);
					}}
				/>
				<button on-click={() => execCmd("justifyLeft")}>{"<="}</button>
				<button on-click={() => execCmd("justifyCenter")}>{"=="}</button>
				<button on-click={() => execCmd("justifyRight")}>{"=>"}</button>
				<button on-click={() => execCmd("justifyFull")}>{"<=>"}</button>
				<button on-click={() => execCmd("cut")}>cut</button>
				<button on-click={() => execCmd("copy")}>copy</button>
				<button on-click={() => execCmd("indent")}>Indent</button>
				<button on-click={() => execCmd("outdent")}>Outdent</button>
				<button on-click={() => execCmd("subscript")}>Subscript</button>
				<button on-click={() => execCmd("superscript")}>Superscript</button>
				<button on-click={() => execCmd("undo")}>Undo</button>
				<button on-click={() => execCmd("redo")}>Redo</button>
				<button on-click={() => execCmd("insertUnorderedList")}>ul</button>
				<button on-click={() => execCmd("insertOrderedList")}>ol</button>
				<button on-click={() => execCmd("insertParagraph")}>P</button>
				<select
					on-change={(event) => {
						execCmd("formatBlock", event.path[0].value);
					}}
				>
					<option value="H1">H1</option>
					<option value="H2">H2</option>
					<option value="H3">H3</option>
					<option value="H4">H4</option>
					<option value="H5">H5</option>
					<option value="H6">H6</option>
				</select>
				<button on-click={() => execCmd("insertHorizontalRule")}>HR</button>
				<button
					on-click={() => {
						const text = prompt("enter url");
						if (!text > "") return;
						execCmd("createLink", text);
					}}
				>
					Link
				</button>
				<button on-click={() => execCmd("unlink")}>Unlink</button>
				<button on-click={() => toggleSource()}>Toggle Source</button>
				<button on-click={() => toggleEdit()}>Toggle Edit</button>
				<select
					on-change={(event) => {
						execCmd("fontName", event.path[0].value);
					}}
				>
					<option value="Arial">Arial</option>
					<option value="Segoe UI">Segoe UI</option>
					<option value="Courier">Courier</option>
					<option value="Verdana">Verdana</option>
					<option value="Helvetica">Helvetica</option>
					<option value="Georgia">Georgia</option>
				</select>
				<select
					on-change={(event) => {
						execCmd("fontSize", event.path[0].value);
					}}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
				</select>
				<button on-click={() => execCmd("insertImage", prompt("image url"))}>
					image
				</button>
				<button on-click={() => execCmd("selectAll")}>Select all</button>
			</div>
			<iframe id="richTextField" name="richTextField"></iframe>
			<button>TO CUSTOMER</button>
			<button>AS WORK-NOTE</button>
		</div>
	);
};
