const React = require('react');

/**
 * Render edit/delete buttons and note timestamp.
 *
 * List of props: note, time, onEdit, onDelete
 */
const NoteMeta = (props) => {
  return (
    <div className="neverwrote-note-meta">
	    <a role="button" title="Create note"
        style={{ paddingRight: '8px' }}
        onClick={ props.onCreate }
      >
        <span className="fa fa-plus-square" />
      </a>
	  
      <a role="button" title="Edit note"
        style={{ paddingRight: '8px' }}
        onClick={ props.onEdit }
      >
        <span className="fa fa-edit" />
      </a>

      <a role="button" title="Delete note"
         style={{ paddingRight: '8px' }}
         onClick={ props.onDelete }
      >
        <span className="fa fa-remove" />
      </a>

    </div>
  );
};

/**
 * A read-only view of a blog note.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 */
const NoteView = (props) => {
  return (
    <div className="neverwrote-note">
      <h2 className="neverwrote-note-title">{props.note.title}</h2>

      <NoteMeta {...props} />

      <div className="neverwrote-note-content">{props.note.content}</div>
    </div>
  );
};

module.exports = NoteView;
