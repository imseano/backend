console.log("Hello world");

const express = require('express')
const cors = require('cors')
const app = express()


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
] 

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(note => note.id === id)
  if (!note) {
    res.status(404).end()
  } else {
    res.json(note)
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  if (!notes.find(note => note.id === id)) {
    return res.status(404).end()
  }
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return (maxId + 1).toString()

}

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.content) {
    return res.status(400).json({
      error: 'note content is missing'
    })
  }
  console.log(note)
  const newNote = { id: generateId(), 
    content: note.content,
    important: note.important || false
  }
  notes = notes.concat(newNote)

  res.json(newNote)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
