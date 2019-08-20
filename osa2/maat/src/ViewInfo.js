import React from 'react';
import Weather from './Weather'

const viewInfo = ({ country }) => {
  //console.log(country)

  const capital = country.capital
  //console.log(capital)
  
  const langs = () => country.languages.map( language =>
    <li key={language.name}>{language.name}</li>
    ) 

  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        Capital city: {country.capital} <br/>
        Population: {country.population}
      </p>
      <h3>Languages</h3>
      <ul>
        {langs()}
      </ul>
      <img src={country.flag} alt="Country's flag" height="150" ></img>
      {Weather(capital)}
    </div>
  );
};

export default viewInfo;