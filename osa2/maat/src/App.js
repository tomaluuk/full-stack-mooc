import React, { useState, useEffect } from 'react'
import Search from './Search';
import Country from './Country';
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const shownCountries = showAll 
    ? countries 
    : countries.filter(country => country.name.toLowerCase().search(searchQuery.toLowerCase()) >= 0)

  const handleSearchQuery = (event) => {
    //console.log(event.target.value)
    setSearchQuery(event.target.value)
    setShowAll(searchQuery === '')
  }

  const rows = () => shownCountries.map( country => 
    <Country key={country.name} 
          name={country.name} />
  )

  return (
    <div>
      <h2>Country information</h2>
      <Search searchHandler={handleSearchQuery} />
      <div>
        <ul>
          {rows()}
        </ul>
      </div>
    </div>
  )

}

export default App