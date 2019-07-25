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
          {course.parts.map(part => <Part part={part} key={part.id} />)}
          
      </div>
  )
}

const Part = ({part}) => {
  console.log('Part props', part)

  return (
    <p>
      {part.name}, {part.exercises} excercises
    </p>
  )
}

const Total = ({ course }) => {
  console.log('Total excercises', course)

  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
      <h3>
        A total of {total} exercises
      </h3> 
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  )
}

export default App;
