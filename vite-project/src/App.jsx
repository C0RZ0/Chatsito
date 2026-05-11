import {useState} from "react"

function App() {
const [inputMEssage, setInputMessage] = useState("")


const handleSubmit = (e) => {
  e.preventDefault()
  //Como se envian los mensajes al servidor
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setInputMessage(e.target.value)}/>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )

}

export default App