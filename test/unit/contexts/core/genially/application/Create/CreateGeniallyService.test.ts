import GeniallyRepository from "../../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../../../../../../src/contexts/core/genially/domain/Genially";
import CreateGeniallyService from "../../../../../../../src/contexts/core/genially/application/Create/CreateGeniallyService";
import GeniallyId from "../../../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyName from "../../../../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyDescription from "../../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import { GeniallyFieldLengthExceeded } from "../../../../../../../src/contexts/core/genially/domain/GeniallyFieldLengthExceeded";


describe("CreateGeniallyService", () => {
    it("should create a Genially", async () => {
        const repository: GeniallyRepository = {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn()
        };
        const createGeniallyService = new CreateGeniallyService(repository);
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const description = "a_description";
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));

        await createGeniallyService.execute({ id, name, description });

        expect(repository.save).toHaveBeenCalledWith(expectedGenially);
    });

    it("should generate an exception for names shorter than 3 characters", async () => {
        expect(() => {
            const repository: GeniallyRepository = {
                save: jest.fn(),
                update: jest.fn(),
                find: jest.fn(),
                delete: jest.fn()
            };
            const createGeniallyService = new CreateGeniallyService(repository);
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a";
            const description = "a_description";
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));

            createGeniallyService.execute({ id, name, description });

            expect(repository.save).toHaveBeenCalledWith(expectedGenially);
        }).toThrow(GeniallyFieldLengthExceeded);
    });

    it("should generate an exception for names larger than 20 characters", async () => {
        expect(() => {
            const repository: GeniallyRepository = {
                save: jest.fn(),
                update: jest.fn(),
                find: jest.fn(),
                delete: jest.fn()
            };
            const createGeniallyService = new CreateGeniallyService(repository);
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a".repeat(30);
            const description = "a_description";
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));

            createGeniallyService.execute({ id, name, description });

            expect(repository.save).toHaveBeenCalledWith(expectedGenially);
        }).toThrow(GeniallyFieldLengthExceeded);
    });

    it("should generate an exception for a description larger than 125 characters", async () => {
        expect(() => {
            const repository: GeniallyRepository = {
                save: jest.fn(),
                update: jest.fn(),
                find: jest.fn(),
                delete: jest.fn()
            };
            const createGeniallyService = new CreateGeniallyService(repository);
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a".repeat(30);
            const description = "a_description";
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));

            createGeniallyService.execute({ id, name, description });

            expect(repository.save).toHaveBeenCalledWith(expectedGenially);
        }).toThrow(GeniallyFieldLengthExceeded);
    });
});