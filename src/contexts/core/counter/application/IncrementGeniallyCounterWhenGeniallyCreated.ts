import { DomainEventClass } from "../../../shared/domain/Events/DomainEvent";
import { DomainEventSubscriber } from "../../../shared/domain/Events/DomainEventSubscriber";
import { GeniallyCreatedDomainEvent } from "../../genially/domain/GeniallyCreatedDomainEvent";

export class IncrementGeniallyCounterWhenGeniallyCreated implements DomainEventSubscriber<GeniallyCreatedDomainEvent> {

    constructor(private counter: any) {
    }

    subscribedTo(): DomainEventClass[] {
        return [GeniallyCreatedDomainEvent];
    }
    
    async on(domainEvent: GeniallyCreatedDomainEvent): Promise<void> {
        console.log("TENGO UN EVENTO");
    }

}