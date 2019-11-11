const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

morgan.token('reqBody', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

let contacts = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Ranne Hirsimugi",
    "number": "0238457432",
    "id": 8
  },
  {
    "name": "milkaa",
    "number": "87654",
    "id": 10
  }
]


app.get('/api/persons', (req, res) => {
  res.json(contacts)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const contact = contacts.find(contact => contact.id === id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  let timestamp = new Date()
  let count = contacts.length
  res.send(
    `<p> Phonebook has info for ${count} people </p>
    <p>${timestamp}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log(request.headers)
  const contact = request.body
  console.log(contact)

  if (contact.name === "") {
    return response.status(400).json({
      error: 'Name cannot be empty'
    })
  }

  if (contact.number === "") {
    return response.status(400).json({
      error: 'Number cannot be empty'
    })
  }
  
  let exists = contacts.filter(c => contact.name === c.name).length > 0
  // console.log("contact exists:", exists)

  if (exists) {
    return response.status(400).json({
      error: 'Name already exists in the phonebook'
    })
  }
  
  let newContact = [
    {
      "name": contact.name,
      "number": contact.number,
      "id": Math.random() * 10000000000
    }
  ]

  response.json(newContact)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)

