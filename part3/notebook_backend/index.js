const http = require('http')
const express = require('express')
const morgan = require('morgan')

const port = 3001

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time  ms :body'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

let notes = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const App = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(notes))
})

app.get('/', (req, res) => {
  res.json(notes)
})

app.get('/info', (req, res) => {
  let count = notes.length
  const info = `Phonebook has info for ${count} people <br/><br/> ${new Date().toString()}
  `

  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  let id = req.params.id
  let person = notes.find((note) => note.id == id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  let id = req.params.id
  
  try {
    let person = notes.find((note) => note.id == id)
    notes = notes.filter(note => note.id != person.id)

    console.log(notes)

    if (person) res.status(200).end()
  } catch {
    res.status(404).end()
  }
})

app.post('/api/persons/', (req, res) => {
  let data = req.body

  if (data.name && data.number) {
    if (notes.find(note => note.name === data.name)) {
      return res.status(409).json({"error": "name must be unique"})
    }

    data['id'] = String(Math.ceil(Math.random() * 100) + 1)

    notes.push(data)
    console.log(notes)
    res.status(201).end()
  } else {
    console.log('invalid data sent')
    res.status(204).end()
  }
})

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})