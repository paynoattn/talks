/**
 * Class Decorators
 */

function lifts(value: boolean | string) {
  return TargetClass => class {
    eats = new TargetClass().eats;
    lifts = value;
  }
}

@lifts(true)
class Brogrammer {
  eats = 'protein';
}

@lifts('maybe')
class Nerd {
  eats = 'noodles';
}

// function betterLifts(value: boolean | string) {
//   return <T extends {new(...args:any[]):{}}>(TargetClass: T) => class extends TargetClass {
//     lifts = value;
//   }
// }

const dude = new Brogrammer();
console.log(dude);

const notdude = new Nerd();
console.log(notdude);

