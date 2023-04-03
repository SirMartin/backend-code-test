import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import GeniallyId from "../../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/GeniallyName";
import InMemoryGeniallyRepository from "../../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

describe("InMemoryGeniallyRepository", () => {
    it("should save a Genially", async () => {
        const expectedGenially = Genially.create(new GeniallyId("an_id"), new GeniallyName("a_name"), new GeniallyDescription("a_description"));
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);

        const genially = await inMemoryRepository.find(new GeniallyId("an_id"));
        expect(genially).toEqual(expectedGenially);
    });

    it("find should return a saved a Genially", async () => {
        const expectedGenially = Genially.create(new GeniallyId("an_id"), new GeniallyName("a_name"), new GeniallyDescription("a_description"));
        const anotherExpectedGenially = Genially.create(new GeniallyId("another_id"), new GeniallyName("another_name"), new GeniallyDescription("another_description"));
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);
        await inMemoryRepository.save(anotherExpectedGenially);

        const genially = await inMemoryRepository.find(new GeniallyId("an_id"));
        expect(genially).toEqual(expectedGenially);
        const anotherGenially = await inMemoryRepository.find(new GeniallyId("another_id"));
        expect(anotherGenially).toEqual(anotherExpectedGenially);
    });

    it("delete should remove the saved Genially", async () => {
        const expectedGenially = Genially.create(new GeniallyId("an_id"), new GeniallyName("a_name"), new GeniallyDescription("a_description"));
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);
        await inMemoryRepository.delete(new GeniallyId("an_id"));

        const genially = await inMemoryRepository.find(new GeniallyId("an_id"));
        expect(genially).toEqual(undefined);
    });
});