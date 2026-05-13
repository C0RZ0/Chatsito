import { useEffect } from "react"
import {useState} from "react"
import {io} from "socket.io-client"

function App() {

const [inputMessage, setInputMessage] = useState("")
const [mensajeRecibido, setMensajeRecibido] = useState([])
const [socket, setSocket] = useState()
const [user, setUser] = useState("")

useEffect(() => {
  const newSocket = io("localhost:3000")
  setSocket(newSocket)

  newSocket.on("mensaje", (msj) => {
    setMensajeRecibido(msj)
  })

  setUser(prompt("Ingrese su nombre:"))

  return() => {newSocket.disconnect()}
}, [])

const handleSubmit = (e) => {
  e.preventDefault()
  //Como se envian los mensajes al servidor
  socket.emit("mensaje", {user, inputMessage})
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setInputMessage(e.target.value)}/>
        <button type="submit">Enviar</button>
      </form>
      {
        mensajeRecibido.map((mensaje, index) => (
          <div key={`${mensaje.user}-${mensaje.hora}-${index}`}>
            {mensaje.user}: {mensaje.inputMessage} ({mensaje.hora})
          </div>
        ))
      }
    </div>
  )

}

export default App
