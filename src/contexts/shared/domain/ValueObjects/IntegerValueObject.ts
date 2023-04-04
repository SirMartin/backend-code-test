export abstract class IntegerValueObject {
    readonly value: number;
  
    constructor(value: number) {
      this.value = value;
    }
  
    toString(): number {
      return this.value;
    }
  }