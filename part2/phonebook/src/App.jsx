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
    </div>
  )
}

export default App