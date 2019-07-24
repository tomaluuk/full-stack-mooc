import React from 'react';
import './App.css';

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  );
}


const Header = ({ course }) => {
  console.log('Header props', course)

  return (
      <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  console.log('Content props', course)

  return (
      <div>
          <Part part={course.parts[0].name} exercise={course.parts[0].exercises} />
          <Part part={course.parts[1].name} exercise={course.parts[1].exercises} />
          <Part part={course.parts[2].name} exercise={course.parts[2].exercises} />
      </div>
  )
}

const Part = (props) => {
  console.log('Part props', props)

  return (
    <p>
      {props.part}, {props.exercise} excercises
    </p>
  )
}

const Total = ({ course }) => {
  console.log('Total excercises', course)
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return (
      <p>
        A total of {total} exercises
      </p> 
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
