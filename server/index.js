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

const mensajes = []
io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado")
    //mensaje a todos
    socket.emit("bienvenida", "Hola a todos los clientes conectados")

    socket.on("mensaje", (mensaje) => {
        //io.emit("mensaje", mensaje)

        mensajes.push(mensaje)
        io.emit("mensaje", mensajes)
    })
})

server.listen(3000, () => {
    console.log("Servidor esta corriendo en el puerto 3000")
})