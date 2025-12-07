import { useState } from "react"


const Header = (props) => {
  // console.log(props)
  return <h2>{props.course}</h2>
}
const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part part={part} key={part.id} /> )}
    </div>
  )
}
const Part = ({part}) => {
  // console.log(props)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}
const Total = (props) => {
  return (
    <p><b>total of {props.parts.reduce((total, item) => total + item.exercises, 0)} exercises</b></p>
  )
}

const Course = ( {course} ) => {
  const [counter, setCounter] = useState(0)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <p>{counter}</p>
      <button onClick={()=>{if (counter < 10) setCounter(counter + 1)}}>Add Counter</button>
      <button onClick={()=>{if (counter > 0) setCounter(counter - 1)}}>Remove Counter</button>
    </>
  )
}

export default Course