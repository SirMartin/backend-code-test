import { DateValueObject } from "../../../shared/ValueObjects/DateValueObject";

export default class GeniallyCreatedAt extends DateValueObject{
    constructor(value: Date) {
        super(value);
    }
}