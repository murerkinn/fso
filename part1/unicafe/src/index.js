import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      {
        all !== 0 && <table>
        <tbody>
          <Statistics text="good" value={good} />
          <Statistics text="neutral" value={neutral} />
          <Statistics text="bad" value={bad} />
          <Statistics text="all" value={good+neutral+bad} />
          <Statistics text="average" value={(good-bad)/all} />
          <Statistics text="positive" value={(good/all)*100 + '%'} />
        </tbody>
      </table>
      }
      {
        all === 0 && <p>No feedback given</p>
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))