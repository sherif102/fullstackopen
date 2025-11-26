import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
  })
  const copyVotes = {...votes}
  const [highest, setHighest] = useState(highestVote())

  const getRandom = (selected) => {
    const len = anecdotes.length
    const rand = Math.floor(Math.random() * len)
    let newValue
    if (rand === selected && (rand + 1) >= len) newValue = rand - 1;
    else if (rand === selected) newValue = rand + 1;
    else newValue = rand
    setSelected(newValue)
  }

  const doVote = (selected) => {
    copyVotes[selected] += 1
    setVotes(copyVotes)
    setHighest(highestVote())
  }

  const Button = ({getRandom, selected}) => {
    return (
      <button onClick={() => getRandom(selected)}>next anecdote</button>
    )
  }
  const Vote = ({votes, selected}) => {
    return (
      <>
      <p>has {votes[selected]} votes</p>

      <button onClick={() => doVote(selected)}>vote</button>
      </>
    )
  }

  // get the key with highest vote
  function highestVote () {
    let k = 0
    let v = 0
    const ent = Object.entries(copyVotes)
    for (let x = 0; x < ent.length; x++) {
      if (ent[x][1] > v) {
        k = x
        v = ent[x][1]
      }
    }
    // console.log(k)
    return k
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <Vote votes={votes} doVote={doVote} selected={selected}/>
      <Button getRandom={getRandom} selected={selected}/>

      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[highest]}</p>
      <p>has {votes[highest]} votes</p>
    </div>
  )
}

export default App