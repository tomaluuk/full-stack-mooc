import React from 'react';

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

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  );
}

export default Course;