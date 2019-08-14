import React, { useState, useEffect } from 'react'
import Name from './Name';
import Search from './Search';
import NewContactForm from './NewContactForm';
import Contacts from './Contacts';
import contactService from './services/contactService'

const App = () => {

  const [ contacts, setContacts] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(response => {
        //console.log('promise fulfilled')
        setContacts(response.data)
      })
  }, [])
  
  //console.log('render', contacts.length, 'contacts')

  const addContact = (event) => {
    event.preventDefault()

    const contactObject = {
      name: newName,
      number: newNumber,
    }
    
    const isDuplicate = contacts.find( (nameInList) => {      
      return nameInList.id === contactObject.id
    }) 
    
    if(!isDuplicate) {
      setContacts(contacts.concat(contactObject))
      
      console.log('nimi lisätty luetteloon')
      console.log('form submitted', event.target)     
      setNewName('')
      setNewNumber('')
    }
    else alert(`${newName} on jo puhelinluettelossa`)
    
    contactService
    .create(contactObject)
    .then(response => {
      setContacts(contacts.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
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

  const handleDelete = (event) => {
    console.log(event.target)
    const contactName = event.target.id
    const result = window.confirm("Delete " + contactName + " from your phonebook?")
    console.log(result)
    
    const contactToBeDeleted = contacts.find(contact => contact.name === contactName)

    if (result) {
      contactService
        .del(contactToBeDeleted.id)
        .then(response => {
          setContacts(contacts.filter(contact => contact.name !== contactName))
        })
        .catch (error => {
          alert("Error while deleteing contact")
        })
    }
  }

  const rows = () => shownContacts.map( person => 
    <Name key={person.name} 
          name={person.name} 
          number={person.number} 
          handleDelete={handleDelete}/>
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