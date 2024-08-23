// b20-JS: Lock/unlock token via macro
// Author: @redweller

// Just that.

d20.engine.selected().forEach(({model: t}) => t.save({lockMovement: !t.attributes.lockMovement}))