const React = require('react');
const _ = require('lodash');

const MarkdownEditor = require('./MarkdownEditor');

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note || {};

    this.state = {
      title: note.title || '',
      content: note.content || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      // Creates a new note object and saves it.
      const editedNote = _.assign({}, this.props.note, {
        title: this.state.title,
        content: this.state.content
      });
      this.props.onSave(editedNote);
    };

     const onChangeContent = (event) => {
      this.setState({ content: event.target.value });
    };
	
    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };
	
    return (
      <form className="neverwrote-note">
		{/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Note title" onChange={onTitleChange}
          />
        </div>
		
        <div className="form-group">
        <MarkdownEditor
          value={this.props.note.content} onChange={onChangeContent} />
        </div>

        {/* Save button */}
        <button className="btn btn-default pull-right"
          onClick={submitAndStopEditing}
        >
          Save
        </button>
        {/* Cancel button */}
        <button className="btn btn-default pull-right"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}
        >
          Cancel
        </button>
      </form>
    );
  }
}

module.exports = NoteEdit;
