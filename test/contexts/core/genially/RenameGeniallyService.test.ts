import GeniallyRepository from "../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../../../src/contexts/core/genially/domain/Genially";
import RenameGeniallyService from "../../../../src/contexts/core/genially/application/RenameGeniallyService"

describe("RenameGeniallyService", () => {
    it("should rename a Genially", async () => {
        const id = "an_id"
        const name = "a_name"
        const description = "a_description"
        const newName = "a_new_name";
        const originalGenially = new Genially(id, name, description);
        const expectedGenially = new Genially(id, newName, description);

        const repository: GeniallyRepository = {
            save: jest.fn(),
            find: jest.fn().mockReturnValue(originalGenially),
            delete: jest.fn()
        }
        const renameGeniallyService = new RenameGeniallyService(repository);

        await renameGeniallyService.execute(id, newName);
    
        expect(repository.find).toHaveBeenCalledWith(id)
        expect(repository.save).toHaveBeenCalledWith(expectedGenially)
    });
});