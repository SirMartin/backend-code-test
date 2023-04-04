import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyId from "../../../../../../src/contexts/core/genially/domain/GeniallyId";

export class GeniallyRepositoryMock implements GeniallyRepository {
    private saveMock: jest.Mock;

    constructor() {
        this.saveMock = jest.fn();
    }

    update(genially: Genially): Promise<void> {
        throw new Error("Method not implemented.");
    }

    find(id: GeniallyId): Promise<Genially> {
        throw new Error("Method not implemented.");
    }

    delete(id: GeniallyId): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async save(genially: Genially): Promise<void> {
        this.saveMock(genially.toPrimitives());
    }

    assertSaveHaveBeenCalledWith(expected: Genially): void {
        expect(this.saveMock).toHaveBeenCalledWith(expected.toPrimitives());
    }

}