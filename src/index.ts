export default class WsIo implements WsIoInterface {
    private readonly url: string;
    private conn: WebSocket;
    private events: { [key: string]: SocketEvent } = {}

    constructor(url: string) {
        this.url = url;
        this.conn = new WebSocket(this.url);
    }

    close(): void {
        this.conn.close();
    }

    on(socketEvent: string, listener: EventListener): void {
        this.events[socketEvent] = {eventTarget: new EventTarget(), handler: listener}
        this.conn.onmessage = (even) => {
            let payload: PayLoad = JSON.parse(even.data)
            if (!this.events.hasOwnProperty(payload.event))
                this.events[payload.event] = {eventTarget: new EventTarget(), handler: listener}
            let customEvent = new CustomEvent(payload.event, {detail: payload})
            this.events[payload.event].eventTarget.dispatchEvent(customEvent)
        }
        Object.keys(this.events).forEach((ev) => {
            this.events[ev].eventTarget.addEventListener(ev, this.events[ev].handler)
        })

    }

    off(socketEvent: string, listener: EventListener, capture = false): void {
        this.events[socketEvent].eventTarget.removeEventListener(socketEvent, listener, {capture})
    }

    emit(socketEvent: string, data: any): void {
        let payload = {event: socketEvent, data}
        this.conn.send(JSON.stringify(payload))
    }


}
