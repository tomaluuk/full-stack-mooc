import React, { useState } from 'react'
import Name from './Name';

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040 654 9871',
      id: 'Arto Hellas' 
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const newListObject = {
      name: newName,
      number: newNumber,
      id: newName
    }
    
    const isDuplicate = persons.find( (nameInList) => {      
      return nameInList.id === newListObject.id
    }) 
    
    if(!isDuplicate) {
      setPersons(persons.concat(newListObject))
      
      console.log('nimi lisätty luetteloon')
      console.log('form submitted', event.target)     
      // setNewName('')
    }
    else alert(`${newName} on jo puhelinluettelossa`)
  }

  const handleName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const rows = () => persons.map( person => 
    <Name key={person.id} 
          name={person.name} 
          number={person.number} />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div> name: <input onChange={handleName} /></div>
        <div>number: <input onChange={handleNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )

}

export default App