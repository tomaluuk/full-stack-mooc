import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const anecdotes = ['If it hurts, do it more often',
'Adding manpower to a late software project makes it later!',
'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
'Premature optimization is the root of all evil.',
'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  const [mostPop, setMostPop] = useState(0)
  // const points = new Array(anecdotes.length).fill(0)

  const handleClick = () => {  
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    
    console.log(copy)
    
    if (copy[selected] > copy[mostPop]) {
      setMostPop(selected)
    }
  }

  return (
    <div>
      <h1>Software development anecdotes</h1>
      
      <p>{props.anecdotes[selected]}</p>
      <p>Number of votes received {points[selected]}</p>
      
      <button onClick={handleClick}>Next anecdote</button>
      <button onClick={() => handleVote(selected)}>Vote</button>

      <h1>Most popular anecdote</h1>
      <p>{props.anecdotes[mostPop]}</p>
      <h2>With {points[mostPop]} points</h2>
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
