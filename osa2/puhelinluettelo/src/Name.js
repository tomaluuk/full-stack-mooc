import React from 'react';

const Name = ( {name, number, handleDelete} ) => {

    return (
        <div>
            <li>{name} {number}</li> 
            <button id={name} onClick={handleDelete}>delete</button>
        </div>
    );
  
}

export default Name;