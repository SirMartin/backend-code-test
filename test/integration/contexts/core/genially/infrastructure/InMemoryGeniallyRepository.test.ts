import Genially from "../../../../../../src/contexts/core/genially/domain/Genially"
import InMemoryGeniallyRepository from "../../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

describe("InMemoryGeniallyRepository", () => {
    it("should save a Genially", async () => {
        const expectedGenially = Genially.create("an_id", "a_name", "a_description");
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);

        const genially = await inMemoryRepository.find("an_id");
        expect(genially).toEqual(expectedGenially);
    })

    it("find should return a saved a Genially", async () => {
        const expectedGenially = Genially.create("an_id", "a_name", "a_description");
        const anotherExpectedGenially = Genially.create("another_id", "another_name", "another_description");
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);
        await inMemoryRepository.save(anotherExpectedGenially);

        const genially = await inMemoryRepository.find("an_id");
        expect(genially).toEqual(expectedGenially);
        const anotherGenially = await inMemoryRepository.find("another_id");
        expect(anotherGenially).toEqual(anotherExpectedGenially);
    })

    it("delete should remove the saved Genially", async () => {
        const expectedGenially = Genially.create("an_id", "a_name", "a_description");
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);
        await inMemoryRepository.delete("an_id");

        const genially = await inMemoryRepository.find("an_id");
        expect(genially).toEqual(undefined);
    })
})