const React = require('react');
const NoteEdit = require('./NotebookEdit');

/**
 * A button which expands into a form for writing a new note.
 */
class NotebookNew extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {

    if(this.state.create) {
      return (
        <NotebookEdit
          note={this.props.notebook}
          onSave={createNotebook}
          onCancel={closeEdit}
        />
      );
    }

    return (
      <button className="note-edit-more btn btn-primary btn-lg"
        onClick={ openEdit }
      >
        Write new notebook
      </button>
    );
  }
}

module.exports = NotebookNew;
