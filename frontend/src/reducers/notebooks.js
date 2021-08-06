const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
const LOAD = 'neverwrote-frontend/notebooks/LOAD';
const UPDATE = 'neverwrote-frontend/notebooks/UPDATE';
const INSERT = 'neverwrote-frontend/notebooks/INSERT';
const CHANGE = 'neverwrote-frontend/notebooks/CHANGE';
const REMOVE = 'neverwrote-frontend/notebooks/REMOVE';

// The initial state of  data
const initialState = {
  notebooks: [
	{ id: 100, title: 'From Redux Store: A hard-coded notebook' },
	{ id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ],
  notes: [
	{ id: 1001, title: 'From Redux Store: A hard-coded note' },
    { id: 1011, title: 'From Redux Store: Another hard-coded note' },
  ],
  activeNotebookId: -1,
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
	
	state = state || initialState;
	console.log('Notebook reducer state: ' + JSON.stringify(state).replace(/<\//g, "<\\/"));
	action = action || {};
	console.log('Actions called' + action.type);
	switch(action.type) {

		case INSERT: {
			const unsortedNotebooks = _.concat(state.notebooks, action.notes);
	  
			const visibleNotebooks = _.orderBy(unsortedNotebooks, 'createdAt','desc');
	  
			// Return updated state
			return _.assign({}, state, { visibleNotebooks} );
		}	 

		case LOAD: {
			console.log('Load called with notebooks: ' + action.nbdata);
			return _.assign({}, state, { notebooks: action.nbdata  });
	   }

	   case CHANGE: {
		const visibleNotebooks = _.clone(state.notebooks);
		const changedIndex = _.findIndex(state.visibleNotebooks, {id: action.notebook.id })
		visibleNotes[changedIndex] = action.notebook;
		return _.assign({}, state, { visibleNotes });
	  }
  
	  // Removes a single notes from the visible notes list
	  case REMOVE: {
		const visibleNotebooks = _.reject(state.notebooks, {id: action.id});
		return _.assign({}, state, { visibleNotebooks });
	  }

		case UPDATE:{

			return _.assign({}, state, { activeNotebookId: action.data });
		}

		default: return state;
	}
}


reducer.updateNotebooks = (data) => {
	console.log('Reduceer update called');
	return { type: UPDATE, data };
};

reducer.loadNotebooks = () => {
	return (dispatch) => {
	api.get('/notebooks').then((nbdata) => {
			dispatch({ type: LOAD, nbdata})
    }).catch((err) => {
      console.log(err.stack);
	});
	console.log('exit loadnotebooks ' );
  };
};

// Inserts notebook into the notebook list
reducer.insertNotebook = (notebook) => {
	return { type: INSERT, notebook };
  };
  
reducer.deleteNotebook = (notebookId) => {
	return (dispatch) => {
	  api.delete('/notebooks/' + notebookId).then(() => {
		dispatch(reducer.removeNotebook(notebookId));
	  }).catch((err) => {
		console.log(err.stack);
		alert('Failed to delete notebook.');
	  });
	};
  };
  
  // Attempts to update a notebook on the server and updates local notebook data if
  // successful
  reducer.saveNotebook = (editedNotebook, callback) => {
	return (dispatch) => {
	  api.put('/notebooks/' + editedNotebook.id, editedNotebook).then((notebook) => {
		// Saves local notebook.
		dispatch(reducer.changeNotebook(notebook));
		callback();
	  }).catch((err) => {
		console.log(err.stack);
		alert('Failed to save notebook.  Are all of the fields filled in correctly?');
	  });
	};
  };
  
  // Attempts to create a notebook on the server and inserts it into the local notebook
  // list if successful
  reducer.createNotebook = (newNotebook) => {
	return (dispatch) => {
	  api.post('/notebooks', newNotebook).then((notebook) => {
		// This notebook is one that the store returns us! It has notebook id incremented to the next available id
		dispatch(reducer.insertNotebook([notebook]));
		callback();
	  }).catch((err) => {
		console.log(err.stack);
		alert('Failed to create notebook. Are all of the fields filled in correctly?');
	  });
	};
  };
  
  // Changes local notebook data
  reducer.changeNotebook = (notebook) => {
	return { type: CHANGE, notebook };
  };

// Removes a note from the visible notebook list
reducer.removeNotebook = (id) => {
	return { type: REMOVE, id };
  };

// Export the action creators and reducer
module.exports = reducer;
