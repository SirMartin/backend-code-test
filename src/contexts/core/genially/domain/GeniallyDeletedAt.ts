import { DateValueObject } from "../../../shared/ValueObjects/DateValueObject";

export default class GeniallyDeletedAt extends DateValueObject{
    constructor(value: Date) {
        super(value);
    }
}