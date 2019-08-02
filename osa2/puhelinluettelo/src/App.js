import React, { useState } from 'react'
import Name from './Name';

const App = () => {
  const [ contacts, setPersons] = useState([
    { name: 'Arto Hellas', number: '040 654 9871', id: 'Arto Hellas' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 'Ada Lovelace' },
    { name: 'Dan Abramov', number: '12-43-234345', id: 'Dan Abramov' },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 'Mary Poppendieck' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  const addContact = (event) => {
    event.preventDefault()

    const newListObject = {
      name: newName,
      number: newNumber,
      id: newName
    }
    
    const isDuplicate = contacts.find( (nameInList) => {      
      return nameInList.id === newListObject.id
    }) 
    
    if(!isDuplicate) {
      setPersons(contacts.concat(newListObject))
      
      console.log('nimi lisätty luetteloon')
      console.log('form submitted', event.target)     
      // setNewName('')
    }
    else alert(`${newName} on jo puhelinluettelossa`)
  }

  const shownContacts = showAll 
    ? contacts 
    : contacts.filter(contact => contact.name.search(searchQuery) >= 0)

  const handleName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchQuery = (event) => {
    console.log(event.target.value)
    setSearchQuery(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    console.log(searchQuery)
    console.log(searchQuery === '')
    
    setShowAll(searchQuery === '')

  }

  const rows = () => shownContacts.map( person => 
    <Name key={person.id} 
          name={person.name} 
          number={person.number} />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSearch}>
        <div><input onChange={handleSearchQuery} /></div>
        <div><button type="submit">search</button></div>
      </form>
      <h2>Add a new contact</h2>
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