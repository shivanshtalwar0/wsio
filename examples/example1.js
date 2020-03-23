import WebSocketIo from "src/index";

let wsio = new WebSocketIo("ws://127.0.0.1:3000/socket")
wsio.emit("replyme", {cool: "cool stuff", number: 88})
wsio.on("hello", (event) => {
    //data property of every event is attached to details on event object
    let data = event.details
    console.log(data)
})

