'use strict';
module.exports = function(sequelize, DataTypes) {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    },
    content: {
      type: DataTypes.TEXT,
      validate: { notEmpty: true }
    },
    notebookId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function (models){
			  Note.belongsTo(models.Notebook);
    }
  }
	}); 
  return Note;
};