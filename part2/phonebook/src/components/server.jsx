import axios from "axios"

export const postContact = (url, newRecord, persons, setPersons) => {
  axios.post(url, newRecord)
  .then(response => {
    setPersons(persons.concat(response.data))
  })
}
export const updateContact = (url, person, newRecord, persons, setPersons) => {
  const endpoint = `${url}/${person.id}`
  axios.put(endpoint, newRecord)
  .then(response => {
    setPersons(persons.concat(response.data))
  })
}
export const getContact = (url, setPersons) => {
  axios.get(url)
  .then(response => {setPersons(response.data)})
}

export const deleteContact = (url, person, persons, setPersons, setCName, setNotification) => {
  const endpoint = `${url}/${person.id}`
  const id = person.id
  axios.delete(endpoint)
  .then(response => {
    if (response.status === 200) {
      setPersons(persons.filter(person => person.id !== id))
      setCName("success")
      
      setNotification(`Deleted  ${person.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  })
  .catch(error => {

    if (error.status === 404) {
      setCName("error")
        
      setNotification(`Information of ${person.name} has already been removed from server`)
      setTimeout(() => {
        setNotification(null)
        setCName("success")
      }, 3000)
    }
  })
}

export const Delete = ({deleteContact, url, person, persons, setPersons, setNotification, setCName}) => {
  return <button onClick={() => {
    if (window.confirm(`Delete ${person.name} ?`)) deleteContact(url, person, persons, setPersons, setCName, setNotification)
  }}>delete</button>
}

export const Notification = ({ message, cName }) => {
  // const style = {
  //   color: green,
  //   backgroundColor: light-grey;
  // }
  if (message === null) {
    return null
  }
  return (
    <div id="notification" className={cName}>{message}</div>
  )
}