import React, { useState } from 'react'
import Name from './Name';

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id: 'Arto Hellas' 
    }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('form submitted', event.target)

    // const newId = persons.length + 1
    const newListObject = {
      name: newName,
      id: newName
    }
    setPersons(persons.concat(newListObject))
    console.log(persons.concat(newListObject))

  }

  const handleTyping = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const rows = () => persons.map( person => 
    <Name key={person.id} name={person.name} />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleTyping} />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )

}

export default App