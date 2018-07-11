import 'reflect-metadata';

const reflect_key = 'test';

function required(target: any, propertyKey: string) {
  console.log('setting metadata', propertyKey);
  Reflect.defineMetadata(reflect_key, 'required', target, propertyKey);
}

// @validator
class User {
  @required
  firstName: string;
}

const user = new User();
console.log(Reflect.getMetadata(reflect_key, User.prototype, 'firstName'));
console.log(Reflect.getMetadata('design:type', User.prototype, 'firstName'));
