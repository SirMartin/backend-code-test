import { EventEmitter } from "events";
import { DomainEvent } from "../domain/Events/DomainEvent";
import { DomainEventSubscriber } from "../domain/Events/DomainEventSubscriber";
import { EventBus } from "../domain/Events/EventBus";

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map(event => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    subscribers.forEach(subscriber => {
      subscriber.subscribedTo().forEach(event => {
        this.on(event.eventName, subscriber.on.bind(subscriber));
      });
    });
  }
}