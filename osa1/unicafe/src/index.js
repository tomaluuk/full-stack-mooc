import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
      <button onClick={handleClick}>{text}</button>
  )
}

const Stats = ({good, neutral, bad}) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const App = (props) => {
  // tallenna napit omaan tilaansa

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = (newValue) => setGood(newValue)
  const handleNeutral = (newValue) => setNeutral(newValue)
  const handleBad = (newValue) => setBad(newValue)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button text='good' handleClick={() => handleGood(good + 1)} />
      <Button text='neutral' handleClick={() => handleNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => handleBad(bad + 1)} />
      <h2>Statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)