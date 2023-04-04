import { StringValueObject } from "../../../shared/domain/ValueObjects/StringValueObject";
import { GeniallyFieldLengthExceeded } from "./GeniallyFieldLengthExceeded";

export default class GeniallyDescription extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsBelow125Characters(value);
    }

    private ensureLengthIsBelow125Characters(value: string): void {
        if (value.length > 125) {
            throw new GeniallyFieldLengthExceeded(`The Genially description's length <${value}> is larger than 125 characters.`);
        }
    }
}