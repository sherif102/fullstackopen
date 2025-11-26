import { useState } from 'react'

const App = () => {
  // // variable definition style
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  // // objects style
  // const course = 'Half Stack application development'
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exersises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  //  // array style
  // const course = 'Half Stack application development'
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]

  // a single object
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
  ]
}
const [counter, setCounter] = useState(5)

  // // variable definition style
  // return (
  //   <div>
  //     <Header course={course} />
  //     <Content 
  //       part1={part1} exercises1={exercises1}
  //       part2={part2} exercises2={exercises2}
  //       part3={part3} exercises3={exercises3}
  //     />
  //     <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
  //   </div>
  // )

  // // object style
  // return (
  //   <div>
  //     <h1>{course}</h1>
  //     <p>{part1.name} {part1.exercises}</p>
  //     <p>{part2.name} {part2.exercises}</p>
  //     <p>{part3.name} {part3.exercises}</p>
  //     <p>Number of exercises {part1.exercises + part2.exersises + part3.exercises}</p>
  //   </div>
  // )

  // array style
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <p>{counter}</p>
      <button onClick={()=>{if (counter < 10) setCounter(counter + 1)}}>Add Counter</button>
      <button onClick={()=>{if (counter > 0) setCounter(counter - 1)}}>Remove Counter</button>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}
const Content = (props) => {
  return (
    // <p>
    //   {props.part1} {props.exercises1}
    // </p>
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
      {/* <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p> */}
    </div>
  )
}
const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

export default App