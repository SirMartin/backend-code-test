import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyDescription from "../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import GeniallyId from "../../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyName from "../../../../../../src/contexts/core/genially/domain/GeniallyName";
import MongoGeniallyRepository from "../../../../../../src/contexts/core/genially/infrastructure/MongoGeniallyRepository";

describe("MongoGeniallyRepository", () => {
    it("should save a Genially", async () => {
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7"
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName("a_name"), new GeniallyDescription("a_description"));
        const mongoRepository = new MongoGeniallyRepository();

        await mongoRepository.save(expectedGenially);

        const genially = await mongoRepository.find(new GeniallyId(id));
        expect(genially).toEqual(expectedGenially);
    });

    it("find should return a saved a Genially", async () => {
        const expectedId = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const anotherExpectedId = "fdcd2cee-2bc0-4cb7-831e-aabd341e8566";
        const expectedGenially = Genially.create(new GeniallyId(expectedId), new GeniallyName("a_name"), new GeniallyDescription("a_description"));
        const anotherExpectedGenially = Genially.create(new GeniallyId(anotherExpectedId), new GeniallyName("another_name"), new GeniallyDescription("another_description"));
        const mongoRepository = new MongoGeniallyRepository();

        await mongoRepository.save(expectedGenially);
        await mongoRepository.save(anotherExpectedGenially);

        const genially = await mongoRepository.find(new GeniallyId(expectedId));
        expect(genially).toEqual(expectedGenially);
        const anotherGenially = await mongoRepository.find(new GeniallyId(anotherExpectedId));
        expect(anotherGenially).toEqual(anotherExpectedGenially);
    });

    it("delete should set the deleted date to the saved Genially", async () => {
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const description = "a_description";
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const mongoRepository = new MongoGeniallyRepository();

        await mongoRepository.save(expectedGenially);
        const genially = await mongoRepository.find(new GeniallyId(id));
        expect(genially).toEqual(expectedGenially);
        
        await mongoRepository.delete(new GeniallyId(id));
        const deletedGenially = await mongoRepository.find(new GeniallyId(id));
        expect(deletedGenially.deletedAt).not.toEqual(undefined);
    });

    it("update should change the Genially and set the modified date", async () => {
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const newName = "a_new_name";
        const description = "a_description";
        const originalGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const updatedGenially = Genially.create(new GeniallyId(id), new GeniallyName(newName), new GeniallyDescription(description));
        const mongoRepository = new MongoGeniallyRepository();

        await mongoRepository.save(originalGenially);

        await mongoRepository.update(updatedGenially);
        const genially = await mongoRepository.find(new GeniallyId(id));
        expect(genially.name.value).toEqual("a_new_name");
        expect(genially.modifiedAt.value).not.toEqual(undefined);
    });
});