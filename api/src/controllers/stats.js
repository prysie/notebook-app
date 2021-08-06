const express = require('express');
const _ = require('lodash');
const models = require('../models');
const Sequelize = require('sequelize');

const router = express.Router();
function noteFilter(obj) {
  return _.pick(obj, ['title']);
}

const noteCount = models.Note.findAll({attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'noteCount']],raw: true,});
const noteCount2 = models.Notebook.findAll({attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'notebookCount']],raw: true,});
const oldestNotebook = models.Notebook.findOne({attributes: [ ['title', 'oldestNotebook'], [Sequelize.fn('min', Sequelize.col('createdAt')), 'oldestNotebookDate']],exclude:['oldestNotebookDate'],raw: true,});
const recentlyUpdatedNote = models.Note.findOne({attributes: [['title', 'recentlyUpdatedNote'], [Sequelize.fn('max', Sequelize.col('updatedAt')), 'recentlyUpdatedNoteDate']],raw: true,});

router.get('/', (req, res) => {
  Promise
    .all([noteCount, noteCount2, oldestNotebook, recentlyUpdatedNote])
	.then(stat => _.flattenDeep(stat))
	.then(data => _.reduce(data, (a,b) => {console.log('a:' + JSON.stringify(a));console.log('b:' + JSON.stringify(b));return Object.assign(a, b);},{}))
	.then(stat => res.json(stat))
	.catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;

