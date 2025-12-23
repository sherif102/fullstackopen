import { useState } from 'react'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' }
  // ]) 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personDisplay, setPersonDisplay] = useState(persons)
  const [newFilter, setNewFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter persons={persons} setPersonDisplay={setPersonDisplay} setNewFilter={setNewFilter} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons personDisplay={personDisplay}/>
    </div>
  )
}

export default App


const Filter = ({persons, setPersonDisplay, newFilter, setNewFilter}) => {
  const updateFilter = (event) => {
    const filteredRecord = []

    for (let person of persons) {
      if (person.name.toLowerCase().includes(event.target.value.toLowerCase())) filteredRecord.push(person)
    }

    setPersonDisplay(event.target.value.length >= 1 ? filteredRecord : persons)

    setNewFilter(event.target.value)
  }

  return (
    <p>Filter shown with <input type='text' value={newFilter} onChange={updateFilter}/></p>
  )
}

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

  const save = (event) => {
    event.preventDefault()
    if (newName.length < 1) {
      alert('Name must not be empty')
      return
    }

    for ( let name of persons) {
      if (name.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    
    const copyPersons = persons
    copyPersons.push({ name: newName, number: newNumber })

    setPersons(copyPersons)
    setNewName('')
    setNewNumber('')
  }

  return (
    <form>
      <div>
        Name: <input type='text' value={newName} onChange={() => setNewName(event.target.value)}/>
      </div>
      <div>
        Number: <input value={newNumber} onChange={() => setNewNumber(event.target.value)}/>
      </div>
      <div>
        <button type="submit" onClick={save}>add</button>
      </div>
    </form>
  )
}

const Persons = ({personDisplay}) => {
  return (
    <>
      { personDisplay.map((person, key=person.name) => <p key={key}>{person.name} {person.number}</p>) }
    </>
  )
}