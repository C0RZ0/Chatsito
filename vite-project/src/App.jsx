import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import "./App.css"

const SOCKET_URL = `${window.location.protocol}//${window.location.hostname}:3000`

function App() {
  const [inputMessage, setInputMessage] = useState("")
  const [mensajeRecibido, setMensajeRecibido] = useState([])
  const [user] = useState(() => prompt("Ingrese su nombre:")?.trim() || "Anonimo")
  const socketRef = useRef(null)

  useEffect(() => {
    const newSocket = io(SOCKET_URL)
    socketRef.current = newSocket

    const handleMensaje = (msj) => {
      setMensajeRecibido(msj)
    }

    newSocket.on("mensaje", handleMensaje)

    return () => {
      newSocket.off("mensaje", handleMensaje)
      newSocket.disconnect()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const mensajeLimpio = inputMessage.trim()
    if (!mensajeLimpio || !socketRef.current) return

    socketRef.current.emit("mensaje", { user, inputMessage: mensajeLimpio })
    setInputMessage("")
  }

  return (
    <main className="chat-page">
      <section className="chat-card">
        <h1>Chatsito</h1>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
            required
          />
          <button type="submit">Enviar</button>
        </form>
        <div className="messages-list">
          {mensajeRecibido.map((mensaje, index) => (
            <article
              className={`message-bubble ${mensaje.user === user ? "mine" : ""}`}
              key={`${mensaje.user}-${mensaje.hora}-${mensaje.inputMessage}-${index}`}
            >
              <span className="message-author">{mensaje.user}</span>
              <p className="message-text">{mensaje.inputMessage}</p>
              <span className="message-time">{mensaje.hora ?? "--:--"}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
