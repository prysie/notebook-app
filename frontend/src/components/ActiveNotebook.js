const React = require('react');
const ReactRedux = require('react-redux');

const Note = require('./Note');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

  // Function which creates a note component from a Note ID
   const createNoteComponent = (currentNote) => {
    return (
      <Note
        key={currentNote.id}
        note={currentNote}
        saveNote={this.props.saveNote}
		    createNote={this.props.createNote}
        deleteNote={this.props.deleteNote}
      />
    );
  };

  return (
    <div className="row">
      <div className="notes-main">
        {this.props.nbnotes.map(createNoteComponent)}
      </div>
    </div>
  );
  }
}
module.exports = ActiveNotebook;