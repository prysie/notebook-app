const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// This helper function takes the JSON object submitted in a request and
// selects only the fields that are allowed to be set by users
function noteFilter(obj) {
  return _.pick(obj, ['title', 'content']);
}

// Index
router.get('/', (req, res) => {
  models.Note.findAll({ order: [['createdAt', 'DESC']] })
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:noteId', (req, res) => {
	  // Return the specified note record from the database
  models.Note.findById(req.params.noteId)
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', (req, res) => {
  // Create a new note record in the database
  models.Note.create(noteFilter(req.body))
    .then(note => res.json(note))
   .catch(err => res.status(422).json({ error: err.message }));
});

// Destroy
router.delete('/:noteId', (req, res) => {
  // Delete the specified note record from the database
  models.Note.findById(req.params.noteId)
    .then(note => note.destroy())
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update
router.put('/:noteId', (req, res) => {
  // Update the specified note record in the database
  models.Note.findById(req.params.noteId)
    .then(note => note.update(noteFilter(req.body)))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;