// b20-JS: Lock pending combatants
// Author: @redweller

// After launching this macro, during combat (when the combat tracker isn't empty)
// it will lock all tokens waiting for their turns, and unlock the one token
// that's currently active on the Initiative list.

// Use the same macro to lock/unlock all tokens at will if you need.
// When you launch this with a selected token, it will toggle this token's lock state.

if (!d20plus.combat) {
	const ico = "stopwatch";

	d20plus.combat = {
		tokensLocked: false,
		previous: "null",

		init: () => {
			const initw = d20.Campaign.initiativewindow;
			d20plus.ut.injectCode(initw.model, "save", (saveOrder, params) => {
				const pass = saveOrder(...params);
				const order = JSON.parse(initw.model.attributes.turnorder);
				if (order.length) {
					const curCharID = d20plus.ut.getTokenById(order[0]?.id)?.character?.id;
					const curTokens = d20.Campaign.activePage().thegraphics.models.filter(t => t.attributes.represents === curCharID);
					d20plus.combat.previous !== curTokens[0]?.id && d20plus.combat.doLock(curTokens, curTokens[0]?.id !== "-1");
					d20plus.combat.previous = curTokens[0]?.id;
				} else {
					d20plus.combat.previous !== "" && d20plus.combat.doLock([], false);
					d20plus.combat.previous = "";
				}
				return pass;
			});
		},

		doLock: (sel, force) => {
			sel = sel || [];
			d20.engine.selected().length > 1 && d20.engine.unselect();
			const lock = force === undefined
				? !!sel.length || !d20plus.combat.tokensLocked
				: force;
			const marker = ({attributes: {statusmarkers: s}}, wait) => !wait
				? s.split(",").filter(i => i !== ico).join(",")
				: s.split(",").filter(i => !!i).concat(s.includes(ico) ? [] : ico).join(",");
			d20.Campaign.activePage().thegraphics.models
				.filter(t => !!t.character)
				.filter(({ attributes, character: {attributes: character} }) => !!character.controlledby
					&& character.controlledby !== "all"
					&& attributes.layer === "objects")
				.forEach(t => t.save({ lockMovement: lock, statusmarkers: marker(t, lock) }));
			d20plus.combat.tokensLocked = lock;
			!!sel.length && setTimeout(() => {
				sel.forEach(c => c.save({ lockMovement: false, statusmarkers: marker(c, false) }));
				d20plus.combat.tokensLocked = false;
			}, 200);
		},
	};

	d20plus.combat.init();
} else {
	const selected = d20.engine.selected().map(t => t.model).filter(t => !!t?.character);
	d20plus.combat.doLock(selected);
}