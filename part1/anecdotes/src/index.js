import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState([Math.floor(Math.random() * anecdotes.length)])
  const [points, setPoints] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const copy = [...points]

  const handleVote = () => {
    copy[selected] += 1
    setPoints(copy)
  }
  
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => setSelected([Math.floor(Math.random() * anecdotes.length)])}>next anecdote</button>
      <h1>Anecdote with Most Votes</h1>
      <p>{props.anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))