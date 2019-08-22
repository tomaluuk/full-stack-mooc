import React, { useState, useEffect } from 'react'
import Name from './Name';
import Search from './Search';
import NewContactForm from './NewContactForm';
import Contacts from './Contacts';
import contactService from './services/contactService'
import ErrorMessage from './ErrorMessage';
import Message from './Message';

const App = () => {

  const [ contacts, setContacts] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ message, setMessage ] = useState(null)

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

    const matchingContact = contacts.find( contactInList => {      
      return contactInList.name === contactObject.name
    }) 

    console.log(matchingContact)

    if(matchingContact === undefined) {
      setContacts(contacts.concat(contactObject))
      
      /* console.log('nimi lisätty luetteloon')
      console.log('form submitted', event.target)      */

      contactService
        .create(contactObject)
        .then(response => {
          setContacts(contacts.concat(response.data))
          setNewName('')
          setNewNumber('')

          setMessage(`"${contactObject.name}" added to phonebook!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Error occurred while creating contact: ${error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        
    }
    else {
      const result = window.confirm(`${newName} on jo puhelinluettelossa. Haluatko päivittää kontaktin numeroksi "${contactObject.number}"?`)
      if (result) {
        const updatedContact = {...matchingContact, number: contactObject.number}
        
        console.log(updatedContact)
        
        contactService
          .update(updatedContact.id, updatedContact)
          .then(response => {
            setContacts(contacts.map( contact => contact.id === updatedContact.id ? updatedContact : contact))

            setMessage(`Contact "${updatedContact.name}" updated successfully!`)
            
            setTimeout( () => {
              setMessage(null)
            }, 5000)
        })
          .catch(error => {
            setErrorMessage(`Error occurred while updating contact information: ${error}`)
            
            setTimeout( () => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }

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

          setMessage(`Contact "${contactToBeDeleted.name}" deleted successfully!`)

          setTimeout( () => {
            setMessage(null)
          }, 5000)
        })
        .catch (error => {
          setErrorMessage(`Error occurred while deleteing contact: ${error}`)
          
          setTimeout( () => {
            setErrorMessage(null)
          }, 5000)
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
      <h1>Phonebook</h1>
      <ErrorMessage message={errorMessage} />
      <Message message={message} />
      <Search searchHandler={handleSearchQuery} />
      <h2>Add a new contact</h2>
      <NewContactForm nameHandler={handleName} numberHandler={handleNumber} addContact={addContact}/>
      <h2>Numbers</h2>
      <Contacts rows={rows} />
    </div>
  )

}

export default App