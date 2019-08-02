import React from 'react';

const NewContactFrom = ({ nameHandler, numberHandler, addContact}) => {
  return (
    <form onSubmit={addContact}>
    <div> name: <input onChange={nameHandler} /></div>
    <div>number: <input onChange={numberHandler} /></div>
    <div><button type="submit">add</button></div>
  </form>
  );
};

export default NewContactFrom;