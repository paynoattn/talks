function assign(target: any, propertyKey: string) {
  target[propertyKey] = propertyKey;
}

class ClassWithProperties {
  @assign yo;
}

const yoyo = new ClassWithProperties();

console.log(yoyo, yoyo.yo, ClassWithProperties.prototype);
