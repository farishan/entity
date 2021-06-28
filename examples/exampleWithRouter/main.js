let entityCounter = 0

function Item(name, mass = 0) {
  Entity.call(this, name);

  this.mass = mass;
  this.__dangerouslySetID(entityCounter++)
}
Item.prototype = Object.create(Entity.prototype);
Item.prototype.constructor = Item;

// Chip
function Chip(name) {
  Item.call(this, name, 1 /* < mass */);
}
Chip.prototype = Object.create(Item.prototype);
Chip.prototype.constructor = Chip;
Chip.prototype.speak = function(){
  console.log('the chip is speaking...')
}

// Core
function Core(name) {
  Item.call(this, name, 1 /* < mass */);
}
Core.prototype = Object.create(Item.prototype);
Core.prototype.constructor = Core;

// const chip1 = new Chip("chip1");
// const item1 = new Item('test')
// const item2 = new Item('test1')
// console.log(item1, item2)

this.chip = Chip
this.core = Core
