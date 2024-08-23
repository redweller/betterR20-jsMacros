// b20-JS: Assign single roll to group initiative
// Author: @redweller

// Select tokens and run the macro. It will roll for initiative once.
// Same roll result will be assigned to selected tokens

tokens = d20.engine.selected()
d20.engine.unselect()
d20.textchat.doChatInput("Your group initiative is [[1d20]]")
setTimeout(() => {
	const init = $(`.inlinerollresult`).last().text();
	tokens.forEach(t => {
		const name = t._model.attributes.name;
		d20.engine.select(t);
		d20.textchat.doChatInput(`${name} initiative set to [[${init} &{tracker}]]`)
		d20.engine.unselect();
	})
}, 1200)