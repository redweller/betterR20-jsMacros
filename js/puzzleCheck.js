// b20-JS: Create moving puzzles
// Author: @redweller

// Create puzzles where players need to move some objects
// (images, tokens, whatever) to the desired positions.
// Enable this macro for players, and let them press the button
// whenever they wanna try "solving" it. If the objects are misplaced,
// they will return to their original location, resetting the puzzle.

// To record `initial` and `desired` position run the small macro below
// while having the object selected and in place, and record the output
// to the appropriate constants.

// to get placement list
// d20.engine.selected().reduce((list, t) => list + "\n" + t._model.id + " " + t._model.attributes.left + " " + t._model.attributes.top, "")

const initial = `
	-NZvoYuwGZGA-Rc4SRVW 980 630
	-NZwQTrA5JGS88qF6BPV 980 1050
	-NZwQWmPzzQPEaW0fy93 420 1050
	-NZwQZ8sTqDARmlPZazX 420 700
	-NZwQayRX7NXWykiyhf0 420 1050
	-NZwQi2y6XjM8MSwiNY1 420 700
	-NZwQllys9QzU0DBhx48 980 1050
	-NZwQs8wAkKjAwYbAexs 980 630
	-NZwQvmkffLL1o3LrOSh 420 700
	-NZwQyuJpfmT3-wACLD2 980 1050
	-NZwR0MJc_4Cm0-bPFxu 420 1050
	-NZwR3vQZNL725SO5X5j 980 630
`;

const desired = `
	-NZwQs8wAkKjAwYbAexs 630 700
	-NZwQvmkffLL1o3LrOSh 630 840
	-NZwQyuJpfmT3-wACLD2 630 980
	-NZwR0MJc_4Cm0-bPFxu 630 1120
	-NZwR3vQZNL725SO5X5j 630 1260
`;

const wrong = desired.split("\n\t").some(ln => {
	const [id, x, y] = ln.split(" ");
	const tk = d20plus.ut.getTokenById(id);
	if (!tk) return false;
	if (tk.attributes.left === Number(x) && tk.attributes.top == Number(y)) return false;
	else return true;
});

if (wrong) {
	initial.split("\n\t").forEach(ln => {
		const [id, x, y] = ln.split(" ");
		const tk = d20plus.ut.getTokenById(id);
		if (!tk) return;
		d20.engine.unselect();
		tk.save({
			left: x,
			top: y,
			aura2_radius: "",
		});
	})
} else {
	desired.split("\n\t").forEach(ln => {
		const [id, x, y] = ln.split(" ");
		const tk = d20plus.ut.getTokenById(id);
		if (!tk) return;
		d20.engine.unselect();
		tk.save({
			aura2_radius: "1",
			aura2_color: "#980000",
			showplayers_aura2: true,
		});
	});
}