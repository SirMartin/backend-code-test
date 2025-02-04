import GeniallyRepository from "../../../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../../../../../../src/contexts/core/genially/domain/Genially";
import DeleteGeniallyService from "../../../../../../../src/contexts/core/genially/application/Delete/DeleteGeniallyService";
import GeniallyId from "../../../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyName from "../../../../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyDescription from "../../../../../../../src/contexts/core/genially/domain/GeniallyDescription";

describe("DeleteGeniallyService", () => {
    it("should delete a Genially", async () => {
        const repository: GeniallyRepository = {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn()
        };
        const deleteGeniallyService = new DeleteGeniallyService(repository);
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const description = "a_description";
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));

        await deleteGeniallyService.execute(expectedGenially.id.value);
    
        expect(repository.delete).toHaveBeenCalledWith(expectedGenially.id);
    });
});