function a(target) {
  console.log('a');
}

function b(target, propertyKey) {
  console.log('b');
}

function c(target, propertyKey, propertyDescriptor) {
  console.log('c');
}

@a
class Foobar {
  @b bar: string;
  @b fizz: string;

  constructor() {
    console.log('constructor reached')
  }

  @c
  hello() {
    return this.bar + this.fizz;
  }
}


const test = new Foobar();
test.bar = 'a';
test.fizz = 'fizz';
test.hello();

