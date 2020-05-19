import "./icons/icon-bold.js";
import "./icons/icon-italic.js";
import "./icons/icon-underline.js";
import "./icons/icon-strikethrough.js";
import "./icons/icon-resize.js";
import "./icons/icon-forecolor.js";
import "./icons/icon-backcolor.js";
import "./icons/icon-align-left.js";
import "./icons/icon-align-center.js";
import "./icons/icon-align-right.js";
import "./icons/icon-align-solid.js";
import "./icons/icon-outdent.js";
import "./icons/icon-indent.js";
import "./icons/icon-cut.js";
import "./icons/icon-copy.js";
import "./icons/icon-edit.js";
import "./icons/icon-font.js";
import "./icons/icon-image.js";
import "./icons/icon-link.js";
import "./icons/icon-unlink.js";
import "./icons/icon-list-ordered.js";
import "./icons/icon-list-unordered.js";
import "./icons/icon-paragraph.js";
import "./icons/icon-redo.js";
import "./icons/icon-undo.js";
import "./icons/icon-select-all.js";
import "./icons/icon-source.js";
import "./icons/icon-subscript.js";
import "./icons/icon-superscript.js";
import "./icons/icon-hr.js";

export default (state, { updateState, updateProperties, dispatch }) => {
	const { properties } = state;

	const document = state.shadowRoot
		? state.shadowRoot.getElementById("richTextField").contentDocument
		: "";

	const iFrame = state.shadowRoot
		? state.shadowRoot.getElementById("richTextField")
		: "";

	const body = state.shadowRoot ? document.getElementsByTagName("body")[0] : "";
	const head = state.shadowRoot ? document.getElementsByTagName("head")[0] : "";

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
		const style = `body {font-family: "Segoe UI";}`;
		head.innerHTML = `<style>${style}`;

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
		<div className="wrapper">
			<div className="function-container">
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("bold")}
				>
					<a title="bold">
						<icon-bold />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("italic")}
				>
					<a title="italic">
						<icon-italic />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("underline")}
				>
					<a title="underline">
						<icon-underline />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("strikeThrough")}
				>
					<a title="strikethrough">
						<icon-strikethrough />
					</a>
				</button>

				<a className="icon-wrapper relative hover active" title="text color">
					<icon-forecolor />
					<input
						className="color-picker"
						type="color"
						on-change={(event) => {
							execCmd("foreColor", event.path[0].value);
						}}
					/>
				</a>
				<a
					className="icon-wrapper relative hover active"
					title="background color"
				>
					<icon-backcolor />
					<input
						className="color-picker"
						type="color"
						on-change={(event) => {
							execCmd("hiliteColor", event.path[0].value);
						}}
					/>
				</a>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("justifyLeft")}
				>
					<a title="align left">
						<icon-align-left />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("justifyCenter")}
				>
					<a title="align center">
						<icon-align-center />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("justifyRight")}
				>
					<a title="align right">
						<icon-align-right />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("justifyFull")}
				>
					<a title="align full">
						<icon-align-solid />
					</a>
				</button>

				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("cut")}
				>
					<a title="cut">
						<icon-cut />
					</a>
				</button>

				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("copy")}
				>
					<a title="copy">
						<icon-copy />
					</a>
				</button>

				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("indent")}
				>
					<a title="indent">
						<icon-indent />
					</a>
				</button>

				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("outdent")}
				>
					<a title="outdent">
						<icon-outdent />
					</a>
				</button>

				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("subscript")}
				>
					<a title="subscript">
						<icon-subscript />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("superscript")}
				>
					<a title="superscript">
						<icon-superscript />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("undo")}
				>
					<a title="undo">
						<icon-undo />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("redo")}
				>
					<a title="redo">
						<icon-redo />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("insertOrderedList")}
				>
					<a title="list-ordered">
						<icon-list-ordered />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("insertUnorderedList")}
				>
					<a title="list-unordered">
						<icon-list-unordered />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("insertParagraph")}
				>
					<a title="paragraph">
						<icon-paragraph />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("insertHorizontalRule")}
				>
					<a title="horizontal rule">
						<icon-hr />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => {
						const text = prompt("enter image url");
						if (!text > "") return;
						execCmd("insertImage", text);
					}}
				>
					<a title="image">
						<icon-image />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("selectAll")}
				>
					<a title="select-all">
						<icon-select-all />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => {
						const text = prompt("enter url");
						if (!text > "") return;
						execCmd("createLink", text);
					}}
				>
					<a title="link">
						<icon-link />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => execCmd("unlink")}
				>
					<a title="unlink">
						<icon-unlink />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => toggleSource()}
				>
					<a title="source">
						<icon-source />
					</a>
				</button>
				<button
					className="icon-wrapper hover active"
					on-click={() => toggleEdit()}
				>
					<a title="edit">
						<icon-edit />
					</a>
				</button>

				<select
					className="icon-wrapper selector first"
					on-change={(event) => {
						execCmd("fontName", event.path[0].value);
					}}
				>
					<option value="Segoe UI">Segoe UI</option>
					<option value="Arial">Arial</option>
					<option value="Courier">Courier</option>
					<option value="Verdana">Verdana</option>
					<option value="Helvetica">Helvetica</option>
					<option value="Georgia">Georgia</option>
				</select>
				<select
					className="icon-wrapper selector second"
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
				<select
					className="icon-wrapper selector third"
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
					<a title="drag to resize">
						<icon-resize />
					</a>
				</div>
			</div>

			<div className="button-container">
				{state.properties.settings.buttons.map((button) => (
					<button
						key={button.label}
						on-click={button.onclick}
						value={button.label}
						className="main-button"
					>
						{button.label}
					</button>
				))}
			</div>
		</div>
	);
};
