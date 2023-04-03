import { DateValueObject } from "../../../shared/ValueObjects/DateValueObject";

export default class GeniallyModifiedAt extends DateValueObject{
    constructor(value: Date) {
        super(value);
    }
}