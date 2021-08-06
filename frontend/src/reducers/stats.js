const _ = require('lodash');
const api = require('../helpers/api');


// Action type constants
const LOADSTATS = 'neverwrote-frontend/stats/LOADSTATS';

// The initial state of stats data
const initialState = {
	data: [
		{"noteCount": 18,
		"notebookCount": 5,
		"oldestNotebook": "Housework",
		"oldestNotebookDate": "2020-11-01T00:10:48.000Z",
		"recentlyUpdatedNote": "Shave the catfghfghfghfgh",
		"recentlyUpdatedNoteDate": "2020-11-04T12:36:51.000Z"}
	],
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
	
	state = state || initialState;
	console.log('Stats reducer state: ' + JSON.stringify(state).replace(/<\//g, "<\\/"));
	action = action || {};
	console.log('Actions called' + action.type);
	switch(action.type) {

		case LOADSTATS: {
			return _.assign({}, state, {data:  action.stats });
		}
			default: return state;
		}
}
  
reducer.loadStats = () => {
	return (dispatch) => {
		api.get('/stats/').then((stats) => {
			dispatch({ type: LOADSTATS, stats });		
    }).catch((err) => {
      console.log(err.stack);
	});
  };
};

// Export the action creators and reducer
module.exports = reducer;
