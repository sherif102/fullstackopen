<<<<<<< HEAD
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getContact, postContact, deleteContact, Delete, updateContact, Notification } from './components/server'
const baseUrl = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [cName, setCName] = useState("success")

  getContact(baseUrl, setPersons)

  const saveName = (event) => {
    event.preventDefault()
    if (newName !== '') {
      const newRecord = {"name": newName, "number": newNumber}

      for (let person of persons) {
        if (person.name === newName) {
          if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
            updateContact(baseUrl, person, newRecord, persons, setPersons)

            setNotification(`Updated ${newRecord.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 3000);

            const fields = document.querySelectorAll('input')
            fields.forEach(input => {console.log(input.value = '')});
          }
          return
        }
      }
      postContact(baseUrl, newRecord, persons, setPersons)

      setNotification(`Added ${newRecord.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000);

      setNewName('')
      setNewNumber('')
      const fields = document.querySelectorAll('input')
      fields.forEach(input => {console.log(input.value = '')});
    }
    else alert("error saving contact")
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} cName={cName} />
      <form>
        <div>
          Name: <input onChange={() => {setNewName(event.target.value)}}/><br/>
          Number: <input type='tel' onChange={() => {setNewNumber(event.target.value)}}/>
        </div>
        <div>
          <button type="submit" onClick={saveName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, key=person.id) => 
          <p key={key}>{person.name} {person.number} <Delete setCName={setCName} deleteContact={deleteContact} url={baseUrl} person={person} persons={persons} setPersons={setPersons} setNotification={setNotification}/></p>
      )}
=======
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
>>>>>>> 09055b3a9def83bddc0f64ab68bbdb4e06198eba
    </div>
  )
}

<<<<<<< HEAD
export default App
=======
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
>>>>>>> 09055b3a9def83bddc0f64ab68bbdb4e06198eba
