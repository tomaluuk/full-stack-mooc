import React from 'react';

const Message = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  );
}

export default Message;