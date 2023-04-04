import GeniallyRepository from "../../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../../../../../../src/contexts/core/genially/domain/Genially";
import RenameGeniallyService from "../../../../../../../src/contexts/core/genially/application/Rename/RenameGeniallyService";
import GeniallyId from "../../../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyName from "../../../../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyDescription from "../../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import { GeniallyFieldLengthExceeded } from "../../../../../../../src/contexts/core/genially/domain/GeniallyFieldLengthExceeded";

describe("RenameGeniallyService", () => {
    it("should rename a Genially", async () => {
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const description = "a_description";
        const newName = "a_new_name";
        const originalGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const expectedGenially = new Genially(originalGenially.id, new GeniallyName(newName), originalGenially.description, originalGenially.createdAt);
        const repository: GeniallyRepository = {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(originalGenially),
            delete: jest.fn()
        };
        const renameGeniallyService = new RenameGeniallyService(repository);

        await renameGeniallyService.execute({ id, newName });

        expect(repository.update).toHaveBeenCalledWith(expectedGenially);
    });

    it("should generate an exception for names shorter than 3 characters", async () => {
        expect(() => {
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a_name";
            const description = "a_description";
            const newName = "a";
            const originalGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
            const expectedGenially = new Genially(originalGenially.id, new GeniallyName(newName), originalGenially.description, originalGenially.createdAt);
            const repository: GeniallyRepository = {
                save: jest.fn(),
                update: jest.fn(),
                find: jest.fn().mockReturnValue(originalGenially),
                delete: jest.fn()
            };
            const renameGeniallyService = new RenameGeniallyService(repository);

            renameGeniallyService.execute({ id, newName });

            expect(repository.find).toHaveBeenCalledWith(new GeniallyId(id));
            expect(repository.save).toHaveBeenCalledWith(expectedGenially);
        }).toThrow(GeniallyFieldLengthExceeded);
    });

    it("should generate an exception for names larger than 20 characters", async () => {
        expect(() => {
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a_name";
            const description = "a_description";
            const newName = "a".repeat(30);
            const originalGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
            const expectedGenially = new Genially(originalGenially.id, new GeniallyName(newName), originalGenially.description, originalGenially.createdAt);
            const repository: GeniallyRepository = {
                save: jest.fn(),
                update: jest.fn(),
                find: jest.fn().mockReturnValue(originalGenially),
                delete: jest.fn()
            };
            const renameGeniallyService = new RenameGeniallyService(repository);

            renameGeniallyService.execute({ id, newName });

            expect(repository.find).toHaveBeenCalledWith(new GeniallyId(id));
            expect(repository.save).toHaveBeenCalledWith(expectedGenially);
        }).toThrow(GeniallyFieldLengthExceeded);
    });
});