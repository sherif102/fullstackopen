import axios from 'axios'
import { useEffect, useState } from 'react'
import { getContact, postContact, deleteContact, Delete, updateContact, Notification } from './components/server'
const baseUrl = 'https://phonebook-backend-8b9k.onrender.com'

// const App = () => {
//   const [persons, setPersons] = useState([]) 
//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')
//   const [notification, setNotification] = useState(null)
//   const [cName, setCName] = useState("success")

//   getContact(baseUrl, setPersons)

//   const saveName = (event) => {
//     event.preventDefault()
//     if (newName !== '') {
//       const newRecord = {"name": newName, "number": newNumber}

//       for (let person of persons) {
//         if (person.name === newName) {
//           if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
//             updateContact(baseUrl, person, newRecord, persons, setPersons)

//             setNotification(`Updated ${newRecord.name}`)
//             setTimeout(() => {
//               setNotification(null)
//             }, 3000);

//             const fields = document.querySelectorAll('input')
//             fields.forEach(input => {console.log(input.value = '')});
//           }
//           return
//         }
//       }
//       postContact(baseUrl, newRecord, persons, setPersons)

//       setNotification(`Added ${newRecord.name}`)
//       setTimeout(() => {
//         setNotification(null)
//       }, 3000);

//       setNewName('')
//       setNewNumber('')
//       const fields = document.querySelectorAll('input')
//       fields.forEach(input => {console.log(input.value = '')});
//     }
//     else alert("error saving contact")
//   }
  
//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <Notification message={notification} cName={cName} />
//       <form>
//         <div>
//           Name: <input onChange={() => {setNewName(event.target.value)}}/><br/>
//           Number: <input type='tel' onChange={() => {setNewNumber(event.target.value)}}/>
//         </div>
//         <div>
//           <button type="submit" onClick={saveName}>add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       {persons.map((person, key=person.id) => 
//           <p key={key}>{person.name} {person.number} <Delete setCName={setCName} deleteContact={deleteContact} url={baseUrl} person={person} persons={persons} setPersons={setPersons} setNotification={setNotification}/></p>
//       )}
//     </div>
//   )
// }

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [personDisplay, setPersonDisplay] = useState(persons)

  const [notification, setNotification] = useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [cName, setCName] = useState("success")

  useEffect(() => {
    getContact(baseUrl, setPersons)
  }, [])
  
  useEffect(() => {
    setPersonDisplay(persons)
  }, [persons])

  return (
    <div>
      <h1>Phonebook <span title='info'><a href={`${baseUrl}/info`}><img src='https://img.icons8.com/?size=100&id=ZiRwjHmdrgtj&format=png&color=000000' width={20} height={20}/></a></span></h1>

      <Notification message={notification} cName={cName} />

      <Filter persons={persons} setPersonDisplay={setPersonDisplay} setNewFilter={setNewFilter} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} updateContact={updateContact} setNotification={setNotification} />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} personDisplay={personDisplay} url={baseUrl} deleteContact={deleteContact} setCName={setCName} setNotification={setNotification} Delete={Delete}/>
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

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, updateContact, setNotification}) => {

  const save = (event) => {
    event.preventDefault()
    if (newName !== '') {
      if (!newNumber) {
        alert(`${newName} cannot be saved without Number`)
        return
      }
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

const Persons = ({persons, personDisplay, url, deleteContact, setCName, setPersons, setNotification, Delete}) => {
  return (
    <>
      {personDisplay.map((person, key=person.id) => 
          <p key={key}>{person.name} {person.number} <Delete setCName={setCName} deleteContact={deleteContact} url={url} person={person} persons={persons} setPersons={setPersons} setNotification={setNotification}/></p>
      )}
    </>
  )
}
