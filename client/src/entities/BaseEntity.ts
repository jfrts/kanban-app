import { DomainEvent } from "../events/DomainEvent";

export class BaseEntity {
    registeredEvents: { eventName: string, callback: Function }[];

    constructor() {
        this.registeredEvents = [];
    }

    on(eventName: string, callback: Function): void {
        this.registeredEvents.push({ eventName, callback });
    }

    publish(event: DomainEvent) {
        for (const registeredEvent of this.registeredEvents) {
            if (event.name === registeredEvent.eventName) {
                registeredEvent.callback(event);
            }
        }
    }
}