function replaceMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.value = () => console.log('dude');
};

class MethodClass {
  @replaceMethod
  test() { 
    console.log('bro');
  }
}

const method = new MethodClass();
method.test();
