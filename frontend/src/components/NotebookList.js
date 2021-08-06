const React = require('react');


const NotebookEdit = require('./NotebookEdit');
const NotebookView = require('./NotebookView');
const ActiveNotebook = require('./ActiveNotebook');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
  
  render() {

    const createNotebookListItem = (nbdata) => {
     

      if(nbdata.id === this.props.notes.activeNotebookId) {
        return <ActiveNotebook key={nbdata.id} 
                  notebook={nbdata} 
                  nbnotes={this.props.notes.data} 
                  saveNote={this.props.saveNote} 
                  deleteNote={this.props.deleteNote} 
                  createNote={this.props.createNote} 
                />;
      }
      
      return <NotebookView 
                key={nbdata.id} 
                notebook={nbdata} 
                loadNotes={this.props.loadNotes} 
                createNotebook={this.props.createNotebook}
                saveNotebook={this.props.saveNotebook}
                deleteNotebook={this.props.deleteNotebook}
              />;
    }
      return (
        <div>
          <h2>Notebooks</h2>
          <ul>
            {this.props.notebooks.data.map(createNotebookListItem)}
          </ul>
        </div>
      );
    }
  }
module.exports = NotebookList;
