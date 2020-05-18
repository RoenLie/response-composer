import "./icons/icon-bold.js";
import "./icons/icon-italic.js";
import "./icons/icon-underline.js";
import "./icons/icon-strikethrough.js";

export default (state, { updateState, updateProperties, dispatch }) => {
	const { output, properties } = state;

	const document = state.shadowRoot
		? state.shadowRoot.getElementById("richTextField").contentDocument
		: "";

	const iFrame = state.shadowRoot
		? state.shadowRoot.getElementById("richTextField")
		: "";

	const body = state.shadowRoot ? document.getElementsByTagName("body")[0] : "";

	let showSource = false;
	let editMode = true;

	const enableEditMode = (state) => {
		document.designMode = state ? "On" : "Off";
	};
	const execCmd = (command, arg) => {
		document.execCommand(command, false, arg || null);
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

	let dragY;
	let dragInterval;
	let interval;

	const resizeFrame = (state) => {
		if (state == "start") {
			if (!iFrame.style.height) iFrame.style.height = "300px";
			dragInterval = dragY;
			interval = setInterval(() => resizeFrame(), 25);
			return;
		}
		if (state == "end") {
			clearInterval(interval);
			dragY = 0;
			dragInterval = 0;
			return;
		}

		const distanceToMove = dragInterval - dragY;
		if (distanceToMove != 0) {
			if (distanceToMove > 200) return;
			iFrame.style.height =
				Number(iFrame.style.height.replace(/px/g, "")) - distanceToMove + "px";
			dragInterval = dragY;
		}
	};

	let buttons = state.properties.settings.buttons;
	if (state.shadowRoot) {
		state.iframeBody = body;

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

		body.onblur = () => {
			const settings = properties.settings;
			settings.iframeBody = body;
			updateProperties({ settings: settings });
		};
	}

	return (
		<div>
			<div className="function-container">
				<button on-click={() => execCmd("bold")}>
					<a title="bold">
						<icon-bold />
					</a>
				</button>
				<button on-click={() => execCmd("italic")}>
					<a title="italic">
						<icon-italic />
					</a>
				</button>
				<button on-click={() => execCmd("underline")}>
					<a title="underline">
						<icon-underline />
					</a>
				</button>
				<button on-click={() => execCmd("strikeThrough")}>
					<a title="strikethrough">
						<icon-strikethrough />
					</a>
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
			<div className="frame-container">
				<iframe id="richTextField" name="richTextField" />
				<div
					className="resize"
					draggable="true"
					droppable="true"
					on-dragstart={(e) => {
						e.dataTransfer.setDragImage(new Image(), 0, 0);
						e.dataTransfer.effectAllow = "move";
						dragY = e.screenY;
						resizeFrame("start");
					}}
					on-dragend={(e) => {
						resizeFrame("end");
					}}
					on-drag={(e) => (dragY = e.screenY)}
				>
					DRAG
				</div>
			</div>

			{state.properties.settings.buttons.map((button) => (
				<button
					key={button.label}
					on-click={button.onclick}
					value={button.label}
				>
					{button.label}
				</button>
			))}
		</div>
	);
};
