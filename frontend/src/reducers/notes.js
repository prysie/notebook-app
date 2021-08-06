const _ = require('lodash');
const api = require('../helpers/api');


// Action type constants
const LOADNOTES = 'neverwrote-frontend/notes/LOADNOTES';
const INSERT = 'neverwrote-frontend/notes/INSERT';
const CHANGE = 'neverwrote-frontend/notes/CHANGE';
const REMOVE = 'neverwrote-frontend/notes/REMOVE';

// The initial state of note data
const initialState = {
	data: [
		{ id: 1001, title: 'From Redux Store: A hard-coded note' },
		{ id: 1011, title: 'From Redux Store: Another hard-coded note' },
	  ],
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
	
	state = state || initialState;
	console.log('Notes reducer state: ' + JSON.stringify(state).replace(/<\//g, "<\\/"));
	action = action || {};
	console.log('Actions called' + action.type);
	switch(action.type) {

    // Inserts new notes into the local store
    case INSERT: {
		// Add in the new notes
		// Notice that we do not need to increment the notes id. Since the notes that we
		// are putting in is one that is returned by the api server which already has
		// the id incremented.
		const unsortedNotes = _.concat(state.notes, action.notes);
  
		const visibleNotes = _.orderBy(unsortedNotes, 'createdAt','desc');
  
		// Return updated state
		return _.assign({}, state, { visibleNotes} );
	  }	 

	case LOADNOTES: {
		return _.assign({}, state, {activeNotebookId: action.notebookId, data:  action.notes });
	   }
	
   	case CHANGE: {
		const visibleNotes = _.clone(state.notes);
		const changedIndex = _.findIndex(state.visibleNotes, {id: action.note.id })
		visibleNotes[changedIndex] = action.note;
		return _.assign({}, state, { visibleNotes });
	  }
  
	  // Removes a single notes from the visible notes list
	  case REMOVE: {
		const visibleNotes = _.reject(state.notes, {id: action.id});
		return _.assign({}, state, { visibleNotes });
	  }
		default: return state;
	}
}

// Inserts notes into the notes list
reducer.insertNotes = (notes) => {
	return { type: INSERT, notes };
};
  
// Attempts to create a note on the server and inserts it into the local note
// list if successful
reducer.createNote = (newNote, callback) => {
	return (dispatch) => {
	  api.post('/notes', newNote).then((note) => {
		// This note is one that the store returns us! It has note id incremented to the next available id
		dispatch(reducer.insertNotes([note]));
		callback();
	  }).catch((err) => {
		console.log(err.stack);
		alert('Failed to create note. Are all of the fields filled in correctly?');
	  });
	};
  };
  
  
reducer.loadNotes = (notebookId) =>{
	return (dispatch) => {
		api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
			dispatch({ type: LOADNOTES, notebookId, notes });
    }).catch((err) => {
      console.log(err.stack);
	});
	console.log('exit load notes ' );
  };
};

// Now we define a whole bunch of action creators
// Inserts notes into the note list
reducer.insertNotes = (notes) => {
	return { type: INSERT, notes };
  };
  
reducer.deleteNote = (noteId) => {
	return (dispatch) => {
	  api.delete('/notes/' + noteId).then(() => {
		dispatch(reducer.removeNote(noteId));
	  }).catch(() => {
		alert('Failed to delete note.');
	  });
	};
  };
  
  // Attempts to update a note on the server and updates local note data if
  // successful
  reducer.saveNote = (editedNote, callback) => {
	return (dispatch) => {
	  api.put('/notes/' + editedNote.id, editedNote).then((note) => {
		// Saves local note.
		dispatch(reducer.changeNote(note));
		callback();
	  }).catch(() => {
		alert('Failed to save note.  Are all of the fields filled in correctly?');
	  });
	};
  };
  
  // Attempts to create a note on the server and inserts it into the local note
  // list if successful
  reducer.createNote = (newNote, callback) => {
	return (dispatch) => {
	  api.post('/notes', newNote).then((note) => {
		// This note is one that the store returns us! It has note id incremented to the next available id
		dispatch(reducer.insertNotes([note]));
		callback();
	  }).catch(() => {
		alert('Failed to create note. Are all of the fields filled in correctly?');
	  });
	};
  };
  
  // Changes local note data
  reducer.changeNote = (note) => {
	return { type: CHANGE, note };
  };

// Removes a note from the visible note list
reducer.removeNote = (id) => {
	return { type: REMOVE, id };
  };

// Attempts to load more notes from the server and inserts them into the local
// note list if successful
reducer.loadMoreNotes = (callback) => {
	return (dispatch, getState) => {
	  const state = _.assign({}, initialState, getState().notes);
  
	  let path = '/notes';

	  api.get('/notes').then((newNotes) => {
		dispatch(reducer.insertNotes(newNotes));
		callback();
	  }).catch(() => {
		alert('Failed to load more notes');
		callback('Failed to load more notes');
	  });
  
	};
  };

// Export the action creators and reducer
module.exports = reducer;
