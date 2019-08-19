import React, { useState } from 'react';
import ViewInfo from './ViewInfo'

const Country = ({ country }) => {
  const [ showInfo, setShowInfo ] = useState(false)

  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
    //console.log(showInfo)
  }

  return (
    <div>
      {country.name} <button id={country.name} onClick={toggleShowInfo}>{showInfo ? 'hide' : 'show more'} </button>
      {showInfo ? <ViewInfo country={country} /> : <br /> }
    </div>
  );
};

export default Country;