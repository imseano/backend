const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const note = await Note.findById(id)

  if (!note) {
    res.status(404).end()
  } else {
    res.json(note)
  }
})

notesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Note.findByIdAndDelete(id)
  res.status(204).end()
})

notesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { content, important } = req.body
  Note.findById(id)
    .then(note => {
      if (!note) {
        return res.status(404).end()
      }
      note.content = content
      note.important = important
      return note.save().then(savedNote => {
        res.json(savedNote)
      })
    })
    .catch(error => next(error))
})


notesRouter.post('/', async (req, res) => {
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

  const savedNote = await newNote.save()
  res.status(201).json(savedNote)
})

module.exports = notesRouter