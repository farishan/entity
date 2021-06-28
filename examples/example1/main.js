function Item(name){
  Entity.call(this, name)
}
Item.prototype = Object.create(Entity.prototype)
Item.prototype.constructor = Item

function ShopItem(name, price = 100){
  Item.call(this, name) // call superclass constructor

  this.price = price
}
ShopItem.prototype = Object.create(Item.prototype)
ShopItem.prototype.constructor = ShopItem

const shopItem1 = new ShopItem('shopItem1', 200)
console.log({shopItem1})