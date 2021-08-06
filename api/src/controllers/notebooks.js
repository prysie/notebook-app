const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// This helper function takes the JSON object submitted in a request and
// selects only the fields that are allowed to be set by users
function notebookFilter(obj) {
  return _.pick(obj, ['title']);
}

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:notebookId/notes', (req, res) => {
	  // Return the specified notebook record notes from the database
	models.Notebook.findById(req.params.notebookId, { include: [models.Note] })
	.then(notebooknote => res.json(notebooknote.Notes))
	.catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:notebookId', (req, res) => {
	  // Return the specified notebook record from the database
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => res.json(notebook))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', (req, res) => {
  // Create a new notebook record in the database
  models.Notebook.create(notebookFilter(req.body))
    .then(notebook => res.json(notebook))
   .catch(err => res.status(422).json({ error: err.message }));
});

// Destroy
router.delete('/:notebookId', (req, res) => {
  
  // Delete the specified notebook record from the database
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.destroy())
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update
router.put('/:notebookId', (req, res) => {
	
  // Update the specified notebook record in the database
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.update(notebookFilter(req.body)))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;