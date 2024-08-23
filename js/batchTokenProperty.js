// b20-JS: batch change token property
// Author: @redweller

// Enter property name and value
// It will be set for all tokens on current map

{
	const param = "showplayers_bar1";
	const newValue = true;
	const page = d20.Campaign.activePage();
	d20.engine.unselect();
	page.thegraphics
		.models
		.forEach(t => {
			if (t.attributes.type !== "image") return;
			t.save({[param]: newValue});
		});
}