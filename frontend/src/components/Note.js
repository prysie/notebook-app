const React = require('react');

const NoteEdit = require('./NoteEdit');
const NoteView = require('./NoteView');

class Note extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const openNew = () => {
      this.setState({ create: true });
    };
	
    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const closeNew = () => {
      this.setState({ create: false });
    };

    const saveEdit = (editedNote) => {
      this.props.saveNote(editedNote, (err) => {
        if(!err) closeEdit();
      });
    };
	
	const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
    };

    if(this.state.editing) {
      return (
        <NoteEdit
          note={this.props.note}
		      onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }
	if(this.state.create) {
		return (
			<NoteEdit
        note={{}}
			  onSave={createNote}
			  onCancel={closeNew}
			/>
		);
	}
  return (
      <NoteView
        note={this.props.note}
        onDelete={deleteThisNote}
        onEdit={openEdit}
        onCreate={openNew}
      />
    );
  }
}

// Export the Note component
module.exports = Note;
