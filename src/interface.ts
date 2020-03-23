interface PayLoad {
    event: string
    data: any
}

interface SocketEvent {
    eventTarget: EventTarget
    handler: EventListener
}


interface WsIoInterface {

    close(): void

    emit(socketEvent: string, data: any): void

    off(socketEvent: string, listener: EventListener, capture: boolean): void

    on(socketEvent: string, listener: EventListener): void;
}
