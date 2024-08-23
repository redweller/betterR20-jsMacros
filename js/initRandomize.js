// b20-JS: Randomize initiative order
// Author: @redweller

// Launch this macro to shuffle initiative order.
// It will reroll Initative for each character on combat tracker.
// Useful e.g. with variant rule of initiative reroll at the start of each round.

if (d20plus.ba) {
	const initw = d20.Campaign.initiativewindow;
	const order = JSON.parse(initw.model.attributes.turnorder);
	const rollInitiative = async (ref) => {
		let token = d20plus.ba.tokens.get(ref.id);
		if (!token) {
			const model = d20plus.ut.getTokenById(ref.id);
			if (!model) return;
			token = d20plus.ba.tokens.ready(model);
			await token.ready();
			await token.character.sheet.fetch();
		}
		d20plus.ba.makeRoll({
			action: "roll",
			id: "roll",
			flags: "initiative",
			token,
		})
	}
	if (order.length) {
		order.forEach(rollInitiative);
	}
}