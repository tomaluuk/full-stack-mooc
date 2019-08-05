import React, { useState, useEffect } from 'react'
import Name from './Name';
import Search from './Search';
import NewContactForm from './NewContactForm';
import Contacts from './Contacts';
import axios from 'axios'

const App = () => {
/* 
  const [ contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040 654 9871' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
   */
  const [ contacts, setContacts] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/contacts')
      .then(response => {
        console.log('promise fulfilled')
        setContacts(response.data)
      })
  }, [])
  console.log('render', contacts.length, 'contacts')

  const addContact = (event) => {
    event.preventDefault()

    const newListObject = {
      name: newName,
      number: newNumber,
    }
    
    const isDuplicate = contacts.find( (nameInList) => {      
      return nameInList.id === newListObject.id
    }) 
    
    if(!isDuplicate) {
      setContacts(contacts.concat(newListObject))
      
      console.log('nimi lisätty luetteloon')
      console.log('form submitted', event.target)     
      setNewName('')
      setNewNumber('')
    }
    else alert(`${newName} on jo puhelinluettelossa`)
  }

  const shownContacts = showAll 
    ? contacts 
    : contacts.filter(contact => contact.name.toLowerCase().search(searchQuery.toLowerCase()) >= 0)

  const handleName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchQuery = (event) => {
    //console.log(event.target.value)
    setSearchQuery(event.target.value)
    setShowAll(searchQuery === '')
  }

  const rows = () => shownContacts.map( person => 
    <Name key={person.name} 
          name={person.name} 
          number={person.number} />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchHandler={handleSearchQuery} />
      <h3>Add a new contact</h3>
      <NewContactForm nameHandler={handleName} numberHandler={handleNumber} addContact={addContact}/>
      <h3>Numbers</h3>
      <Contacts rows={rows} />
    </div>
  )

}

export default App