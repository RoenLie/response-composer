import "./rich-text-editor";

export default (state, { updateState, dispatch }) => {
	const { fieldValue, properties } = state;

	const settings = {
		iframeBody: "",
		buttons: [
			{
				label: "Print innerHTML",
				onclick: () => {
					console.log(settings.iframeBody.innerHTML);
				},
			},
			{
				label: "Print Body",
				onclick: () => {
					console.log(settings.iframeBody);
				},
			},
			{
				label: "print innerText",
				onclick: () => {
					console.log(settings.iframeBody.innerText);
				},
			},
			{
				label: "Post comment",
				onclick: () => {
					dispatch("USER_FETCH_REQUESTED", {
						id: properties.sysId,
						data: `{"comments":"[code]${settings.iframeBody.innerHTML.replace(
							/\n/g,
							"\\n"
						)}[/code]"}`,
					});
				},
			},
		],
	};

	return (
		<div className="wrapper">
			<rich-text-editor
				component-id="richTextEditor"
				settings={settings}
			></rich-text-editor>
		</div>
	);
};
