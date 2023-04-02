import GeniallyRepository from "../../../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../../../src/contexts/core/genially/domain/Genially";
import CreateGeniallyService from "../../../../src/contexts/core/genially/application/CreateGeniallyService"
import CreateGeniallyServiceRequest from "../../../../src/contexts/core/genially/application/CreateGeniallyService"

describe("CreateGeniallyService", () => {
    it("should create a Genially", async () => {
        const repository: GeniallyRepository = {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn()
        }
        const createGeniallyService = new CreateGeniallyService(repository);
        const id = "an_id"
        const name = "a_name"
        const description = "a_description"
        const expectedGenially = new Genially(id, name, description);

        await createGeniallyService.execute({
                 id: "an_id",
                 name: "a_name",
                 description: "a_description"
                 });
    
        expect(repository.save).toHaveBeenCalledWith(expectedGenially)
    });
});