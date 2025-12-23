import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const saveName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
    console.log(event.target)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={() => {setNewName(event.target.value)}}/>
        </div>
        <div>
          <button type="submit" onClick={saveName}>add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name}</p>)}
    </div>
  )
}

export default App