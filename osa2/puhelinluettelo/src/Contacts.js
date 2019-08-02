import React from 'react';

const Contacts = ({ rows }) => {
  return (
  <ul>
    {rows()}
  </ul>
  );
};

export default Contacts;