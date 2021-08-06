const React = require('react');
const NoteEdit = require('./NoteEdit');

/**
 * A button which expands into a form for writing a new note.
 */
class NoteNew extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

    if(this.state.new) {
      return (
        <NoteEdit
          note={this.props.note}
          onSave={createNote}
          onCancel={closeEdit}
        />
      );
    }

    return (
      <button className="note-load-more btn btn-primary btn-lg"
        onClick={ openEdit }
      >
        Write new note
      </button>
    );
  }
}

module.exports = NoteNew;
