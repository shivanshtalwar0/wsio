## WebsocketIo
Simple yet beautiful wrapper around native WebSocket similar to socket.io.  
Why restrict yourself to socket.io for websocket when you can experience similar api but with more flexibility and fine control.  

### API
#### Constructor
    WebSockIo(url:string)


#### Methods        
    close(): void

    emit(socketEvent: string, data: any): void

    off(socketEvent: string, listener: EventListener, capture: boolean): void

    on(socketEvent: string, listener: EventListener): void;
 
#### Examples
    import WebSocketIo from "../dist/index";
    
    let wsio = new WebSocketIo("ws://127.0.0.1:3000/socket")
    wsio.emit("replyme", {cool: "cool stuff", number: 88})
    wsio.on("hello", (event) => {
        //data property of every event is attached to details on event object
        let data = event.details
        console.log(data)
    })
  

