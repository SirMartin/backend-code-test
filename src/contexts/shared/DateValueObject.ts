export abstract class DateValueObject {
    readonly value: Date;
  
    constructor(value: Date) {
      this.value = value;
    }
  
    toString(): string {
      return this.value.toDateString();
    }
  }