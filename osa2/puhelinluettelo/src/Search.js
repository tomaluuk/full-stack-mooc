import React from 'react';

const Search = ({searchHandler}) => {
  return (
    <div>
      Search contacts: 
      <input onChange={searchHandler}/>
    </div>
  );
};

export default Search;