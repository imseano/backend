console.log("Hello world");

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const Note = require('./models/note')

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  }
  )
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  
  Note.findById(id)
    .then(note => {
        if (!note) {
          return res.status(404).end()
        }
        res.json(note)
    })
    .catch(error => {
      res.status(400).end()
    })
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
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'note content is missing'
    })
  }

  const newNote = new Note({  
    content: body.content,
    important: body.important || false
  })

  newNote.save().then(savedNote => {
    res.json(savedNote)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
