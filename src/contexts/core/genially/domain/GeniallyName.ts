import { StringValueObject } from "../../../shared/StringValueObject";
import { GeniallyFieldLengthExceeded } from "./GeniallyFieldLengthExceeded";

export default class GeniallyName extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsBetween3And20Characters(value);
    }

    private ensureLengthIsBetween3And20Characters(value: string): void {
        if (value.length < 3 || value.length > 20) {
            throw new GeniallyFieldLengthExceeded(`The Genially name's length <${value}>  has to be from 3 to 20 characters.`);
        }
    }
}