import Genially from "../../../../../../../src/contexts/core/genially/domain/Genially";
import CreateGeniallyService from "../../../../../../../src/contexts/core/genially/application/Create/CreateGeniallyService";
import GeniallyId from "../../../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyName from "../../../../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyDescription from "../../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import { GeniallyFieldLengthExceeded } from "../../../../../../../src/contexts/core/genially/domain/GeniallyFieldLengthExceeded";
import { GeniallyRepositoryMock } from "../../__mocks__/GeniallyRepositoryMock";
import { EventBusMock } from "../../__mocks__/EventBusMock";
import { GeniallyCreatedDomainEvent } from "../../../../../../../src/contexts/core/genially/domain/GeniallyCreatedDomainEvent";

describe("CreateGeniallyService", () => {
    it("should create a Genially", async () => {
        const repository = new GeniallyRepositoryMock();
        const eventBus = new EventBusMock();
        const createGeniallyService = new CreateGeniallyService(repository, eventBus);
        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "a_name";
        const description = "a_description";
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const expectedEvent = new GeniallyCreatedDomainEvent(expectedGenially.id.value, expectedGenially.name.value, expectedGenially.description.value);

        await createGeniallyService.execute({ id, name, description });

        repository.assertSaveHaveBeenCalledWith(expectedGenially);
        eventBus.assertLastPublishedEventIs(expectedEvent);
    });

    it("should generate an exception for names shorter than 3 characters", async () => {
        expect(() => {
            const repository = new GeniallyRepositoryMock();
            const eventBus = new EventBusMock();
            const createGeniallyService = new CreateGeniallyService(repository, eventBus);
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a";
            const description = "a_description";
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
            const expectedEvent = new GeniallyCreatedDomainEvent(expectedGenially.id.value, expectedGenially.name.value, expectedGenially.description.value);

            createGeniallyService.execute({ id, name, description });

            repository.assertSaveHaveBeenCalledWith(expectedGenially);
            eventBus.assertLastPublishedEventIs(expectedEvent);
        }).toThrow(GeniallyFieldLengthExceeded);
    });

    it("should generate an exception for names larger than 20 characters", async () => {
        expect(() => {
            const repository = new GeniallyRepositoryMock();
            const eventBus = new EventBusMock();
            const createGeniallyService = new CreateGeniallyService(repository, eventBus);
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a".repeat(30);
            const description = "a_description";
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
            const expectedEvent = new GeniallyCreatedDomainEvent(expectedGenially.id.value, expectedGenially.name.value, expectedGenially.description.value);

            createGeniallyService.execute({ id, name, description });

            repository.assertSaveHaveBeenCalledWith(expectedGenially);
            eventBus.assertLastPublishedEventIs(expectedEvent);
        }).toThrow(GeniallyFieldLengthExceeded);
    });

    it("should generate an exception for a description larger than 125 characters", async () => {
        expect(() => {
            const repository = new GeniallyRepositoryMock();
            const eventBus = new EventBusMock();
            const createGeniallyService = new CreateGeniallyService(repository, eventBus);
            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a".repeat(30);
            const description = "a_description";
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
            const expectedEvent = new GeniallyCreatedDomainEvent(expectedGenially.id.value, expectedGenially.name.value, expectedGenially.description.value);

            createGeniallyService.execute({ id, name, description });

            repository.assertSaveHaveBeenCalledWith(expectedGenially);
            eventBus.assertLastPublishedEventIs(expectedEvent);
        }).toThrow(GeniallyFieldLengthExceeded);
    });
});