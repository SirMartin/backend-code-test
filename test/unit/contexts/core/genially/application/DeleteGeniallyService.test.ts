import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import DeleteGeniallyService from "../../../../../../src/contexts/core/genially/application/DeleteGeniallyService"

describe("DeleteGeniallyService", () => {
    it("should delete a Genially", async () => {
        const repository: GeniallyRepository = {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn()
        }
        const deleteGeniallyService = new DeleteGeniallyService(repository);
        const id = "an_id"
        const name = "a_name"
        const description = "a_description"
        const expectedGenially = new Genially(id, name, description);

        await deleteGeniallyService.execute(expectedGenially.id);
    
        expect(repository.delete).toHaveBeenCalledWith(expectedGenially.id)
    });
});