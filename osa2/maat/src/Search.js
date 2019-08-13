import React from 'react';

const Search = ({searchHandler}) => {
  return (
    <div>
      Search countries: 
      <input onChange={searchHandler}/>
    </div>
  );
};

export default Search;