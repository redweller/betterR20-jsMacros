// b20-JS: A better URL dropdown list for Monster Import
// Author: @redweller

// Replaces the default list where it's easy to get lost
// with a nice imput where you can also start typing the name
// of the book you seek and it will suggest the correct option.
// Only needs to be executed once after page reload.

if (!$("#monsters-sources-list").length) {
	const listId = "monsters-sources-list";
	const $select = $("#button-monsters-select");
	const $input = $("#import-monsters-url");
	const $data = $(`<dataList id="${listId}">${$select.html()}</dataList>`);
	
	$data.find("option").each((i,opt) => {
		const o = $(opt);
		o.data("url", o.val());
		o.val(o.text());
		o.text("");
	});
	
	$input.attr("list", listId);
	$input.attr("placeholder", "Start typing source name...");
	$input.on("mousedown", () => $input.val(""));

	$input.on("change", () => {
		const val = $input.val();
		const url = $(`#${listId} [value="${val}"]`).data('url');
		$input.val(url);
	});
	
	$select.toggle(false);
	$select.html("");
	$select.after($data);
}