function Entity(name = 'default'){
  this.id = ID()
  this.name = name
}

// Helpers
function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};