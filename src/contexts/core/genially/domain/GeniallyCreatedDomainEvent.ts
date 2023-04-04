import { DomainEvent } from "../../../shared/domain/Events/DomainEvent";

type GeniallyCreatedDomainEventAttributes = {
    readonly name: string;
    readonly description: string;
}

export class GeniallyCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "genially_created";

    readonly name: string;
    readonly description: string;

    constructor(
        aggregateId: string,
        name: string,
        description: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(aggregateId, eventId, GeniallyCreatedDomainEvent.EVENT_NAME, occurredOn);
        this.name = name;
        this.description = description;
    }

    public toPrimitives(): GeniallyCreatedDomainEventAttributes {
        const { name, description } = this;
        return {
            name,
            description
        }
    }
}