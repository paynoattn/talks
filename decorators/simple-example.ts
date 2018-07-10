

function log(target, propertyKey) {
  console.log(target, propertyKey);
}

class Foo {
  @log
  foo = 'bar';

  @log fiz = 'buz';
}

const foo = new Foo();
