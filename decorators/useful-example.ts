import 'reflect-metadata';

const reflect_key = 'test';

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;
  descriptor.value = function () {
      let requiredParameters: number[] = Reflect.getOwnMetadata(reflect_key, target, propertyName);
      if (requiredParameters) {
          for (let parameterIndex of requiredParameters) {
              if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                  throw new Error("Missing required argument.");
              }
          }
      }
      return method.apply(this, arguments);
  }
}

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(reflect_key, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(reflect_key, existingRequiredParameters, target, propertyKey);
}


// @validator
class UsefulTestThing {
  greeting: string;

  constructor(message: string) {
      this.greeting = message;
  }

  // @validate
  greet(@required name: string) {
      return "Hello " + name + ", " + this.greeting;
  }
}

const exampleTestThing = 
