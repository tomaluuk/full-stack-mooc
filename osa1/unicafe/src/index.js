import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
      <button onClick={handleClick}>{text}</button>
  )
}

const Stat = ({text, value}) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Stats = ({good, neutral, bad}) => {
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <table>
        <tbody>
          <Stat text="good" value={good} />
          <Stat text="neutral" value={neutral} />
          <Stat text="bad" value={bad} />
          <Stat text="all" value={good + neutral + bad} />
          <Stat text="average" value={(good - bad) / (good + neutral + bad)} />
          <Stat text="positive (%)" value={good / (good + neutral + bad) * 100} />
        </tbody>
      </table>
    )
  } else return <p>Give feedback to show statistics</p>;
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