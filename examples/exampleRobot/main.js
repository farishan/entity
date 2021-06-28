function Item(name, mass = 0) {
  Entity.call(this, name);

  this.mass = mass;
}
Item.prototype = Object.create(Entity.prototype);
Item.prototype.constructor = Item;

// Chip
function Chip(name) {
  Item.call(this, name, 1 /* < mass */);
}
Chip.prototype = Object.create(Item.prototype);
Chip.prototype.constructor = Chip;

// Core
function Core(name, chip) {
  const BASE_MASS = 4;
  const totalMass = BASE_MASS+chip.mass;

  Item.call(this, name, totalMass);

  this.chip = chip;
}
Core.prototype = Object.create(Item.prototype);
Core.prototype.constructor = Core;

function Bone(name, parts) {
  Item.call(this, name);

  this.parts = parts;
}
Bone.prototype = Object.create(Item.prototype);
Bone.prototype.constructor = Bone;

function StraightBone(name, parts) {
  Bone.call(this, name, parts);
}
StraightBone.prototype = Object.create(Bone.prototype);
StraightBone.prototype.constructor = StraightBone;

function CurvedBone(name, parts) {
  Bone.call(this, name, parts);
}
CurvedBone.prototype = Object.create(Bone.prototype);
CurvedBone.prototype.constructor = CurvedBone;

// Part
function Part(name) {
  Item.call(this, name);
}
Part.prototype = Object.create(Item.prototype);
Part.prototype.constructor = Part;

// Skeleton
function Skeleton(name, capacity, bones) {
  Item.call(this, name);

  this.capacity = capacity;
  this.bones = bones;
}
Skeleton.prototype = Object.create(Item.prototype);
Skeleton.prototype.constructor = Skeleton;

function Robot(name, cores, skeleton) {
  this.name = name;
  this.cores = cores;
  this.skeleton = skeleton;
}
Robot.prototype.getParts = function () {
  if (this.skeleton && this.skeleton.bones) {
    this.skeleton.bones.forEach((bone) => {
      if (bone.parts) {
        bone.parts.forEach((part) => {
          console.log(part);
        });
      }
    });
  }
};

// Assemblages
const chip1 = new Chip("chip1");
const core1 = new Core("core1", chip1);
const part1 = new Part("part1");
const straightBone1 = new StraightBone("straightBone1", [part1]);
const curvedBone1 = new CurvedBone("curvedBone1");
const skeleton1 = new Skeleton("skeleton1", [straightBone1, curvedBone1]);
const robot1 = new Robot("robot1", [core1], skeleton1);
console.log({ robot1 });
robot1.getParts();

/*
Robot
- Core
  - Chip
- Skeleton
  - Bone
    - BoneType
      - StraightBone
      - CurvedBone
    - Part
      - Subpart

1 Robot many Cores
1 Core 1 Chip
1 Skeleton many Bones
1 Bone 1 Part
1 Part many Subparts
*/
