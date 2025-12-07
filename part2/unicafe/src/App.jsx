import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(good + neutral + bad)

  const setGoodFunc = () => {
    setGood(good + 1);
    setAllFunc()
  }
  const setNeutralFunc = () => {
    setNeutral(neutral + 1);
    setAllFunc()
  }
  const setBadFunc = () => {
    setBad(bad + 1);
    setAllFunc()
  }

  const setAllFunc = () => setAll(all + 1)

  const average = (all === 0 ? 0 : (good - bad)/all)
  const positive = (all === 0 ? 0 : (good/all) * 100)

  const Statistics = (props) => {
    return (
      <>
        <h1>statistics</h1>
        {
        all === 0 ? <p>No feedback given</p> :
        <table>
          <tbody>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={all}/>
            <StatisticLine text='average' value={average}/>
            <StatisticLine text='positive' value={positive}/>
        </tbody>
        </table>
        }
      </>
    )
  }

  const Button = (prop) => {
    return (
      <button onClick={prop.function}>{prop.text}</button>
    )
  }

  const StatisticLine = (prop) => {
    return (
      <tr>
        <td>{prop.text}</td>
        <td>{prop.value}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button function={setGoodFunc} text='good' />
      <Button function={setNeutralFunc} text='neutral' />
      <Button function={setBadFunc} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App