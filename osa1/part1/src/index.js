import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log("Header props" + props)
    console.log(props)

    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    console.log("Content props" + props)
    console.log(props)

    return (
        <div>
            <Part part={props.part1} exercise={props.exercises1} />
            <Part part={props.part2} exercise={props.exercises2} />
            <Part part={props.part3} exercise={props.exercises3} />
        </div>
    )
}

const Total = (props) => {
    console.log("Total props" + props)
    console.log(props)

    return (
        <p>
            Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
        </p> 
    )
}

const Part = (props) => {
    console.log("Part props")
    console.log(props)


    return (
        <p>
            {props.part} {props.exercise}
        </p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

    return (
        <div>
            <Header course={course}/>
            <Content part1={part1.name} part2={part2.name} part3={part3.name}
                    exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
            <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
