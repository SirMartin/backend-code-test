import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import GeniallyId from "../../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/GeniallyName";
import InMemoryGeniallyRepository from "../../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

describe("InMemoryGeniallyRepository", () => {
    it("should save a Genially", async () => {
        const expectedGenially = Genially.create(new GeniallyId("d25bc90b-8b2b-4e18-b6aa-929330b5f6a7"), new GeniallyName("a_name"), new GeniallyDescription("a_description"));
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);

        const genially = await inMemoryRepository.find(new GeniallyId("d25bc90b-8b2b-4e18-b6aa-929330b5f6a7"));
        expect(genially).toEqual(expectedGenially);
    });

    it("find should return a saved a Genially", async () => {
        const expectedGenially = Genially.create(new GeniallyId("d25bc90b-8b2b-4e18-b6aa-929330b5f6a7"), new GeniallyName("a_name"), new GeniallyDescription("a_description"));
        const anotherExpectedGenially = Genially.create(new GeniallyId("fdcd2cee-2bc0-4cb7-831e-aabd341e8566"), new GeniallyName("another_name"), new GeniallyDescription("another_description"));
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);
        await inMemoryRepository.save(anotherExpectedGenially);

        const genially = await inMemoryRepository.find(new GeniallyId("d25bc90b-8b2b-4e18-b6aa-929330b5f6a7"));
        expect(genially).toEqual(expectedGenially);
        const anotherGenially = await inMemoryRepository.find(new GeniallyId("fdcd2cee-2bc0-4cb7-831e-aabd341e8566"));
        expect(anotherGenially).toEqual(anotherExpectedGenially);
    });

    it("delete should set the deleted date to the saved Genially", async () => {
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const description = "a_description";
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(expectedGenially);
        const genially = await inMemoryRepository.find(new GeniallyId(id));
        expect(genially).toEqual(expectedGenially);
        
        await inMemoryRepository.delete(new GeniallyId(id));
        const deletedGenially = await inMemoryRepository.find(new GeniallyId(id));
        expect(deletedGenially).toEqual(undefined);
    });

    it("update should change the Genially and set the modified date", async () => {
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const new_name = "a_new_name";
        const description = "a_description";
        const originalGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const updatedGenially = Genially.create(new GeniallyId(id), new GeniallyName(new_name), new GeniallyDescription(description));
        const inMemoryRepository = new InMemoryGeniallyRepository();

        await inMemoryRepository.save(originalGenially);

        await inMemoryRepository.update(updatedGenially);
        const genially = await inMemoryRepository.find(new GeniallyId(id));
        expect(genially.name.value).toEqual("a_new_name");
        expect(genially.modifiedAt.value).not.toEqual(undefined);
    });
});