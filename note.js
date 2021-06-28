// Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

// Superclass
function Entity(name = 'default'){
  this.id = ID()
  this.name = name
}

// Subclass
function Item(name){
  Entity.call(this, name) // call super constructor.
}
// Subclass extends Superclass
Item.prototype = Object.create(Entity.prototype)

//If you don't set Subclass.prototype.constructor to Subclass,
//it will take the prototype.constructor of Superclass (parent).
//To avoid that, we set the prototype.constructor to Subclass (child).
Item.prototype.constructor = Item

// Test usage
function ShopItem(name, price = 100){
  Item.call(this, name) // call superclass constructor

  this.price = price
}

// Helpers
function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};