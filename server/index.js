const express = require("express")
const {createServer} = require("node:http")
const {Server} = require("socket.io")

const app = express()
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado")
    //mensaje a todos
    socket.emit("bienvenida", "Hola a todos los clientes conectados")

    socket.on("mensaje", (mensaje) => {
        console.log("Recibi el mensaje: ", mensaje)
    })
})

server.listen(3000, () => {
    console.log("Servidor esta corriendo en el puerto 3000")
})