import axios from "axios"

export const postContact = (url, newRecord, persons, setPersons) => {
  if (!newRecord.number) {
    alert(`${newRecord.name} cannot be saved without Number`)
    return
  }
  axios.post(`${url}/api/persons`, newRecord)
  .then(response => {
    let nR = newRecord
    nR.id = response.data
    // console.log(response.data)
    setPersons(persons.concat(nR))
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
  const endpoint = `${url}/api/persons`
  axios.get(endpoint)
  .then(response => {
    // console.log(response.data)
    if (response.statusText === "OK") {
      setPersons(response.data)
    }else setPersons([])
  }).catch(err => {
    console.log(err)
  })
}

export const deleteContact = (url, person, persons, setPersons, setCName, setNotification) => {
  const endpoint = `${url}/api/persons/${person.id}`
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