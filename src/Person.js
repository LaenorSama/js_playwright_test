export class Person {
  constructor(name) {
    this.name = name;
    this.hp = 10;
    this.mdef = 2;
    this.pdef = 3;
  }

  takeTrueDamage(count) {
    this.hp -= count;
  }

  takeMagicDamage(count) {
    this.hp -= count / this.mdef;
  }

  takeMeleeDamage(count) {
    this.hp -= count / this.pdef;
  }

  takeRangedDamage(count, length) {
    const k = (60 - length) / 100;
    this.hp -= (count * k) / this.pdef;
  }

  getName() {
    return this.name;
  }

  getHp() {
    return this.hp;
  }
}
