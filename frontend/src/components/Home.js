/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

const React = require('react');
const ReactRedux = require('react-redux');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const NotebookList = require('./NotebookList');
const StatsList = require('./StatsList');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const statsActionCreators = require('../reducers/stats');

class Home extends React.Component {

  render() {
		return (
			<div className="container">
			{/* The heading area of the page */}
			<div className="neverwrote-header">
			<h1 className="neverwrote-title">Neverwrote - Virtual Notes</h1>
			</div>
        <NotebookList 
          notebooks={this.props.notebooks} 
          loadNotes={this.props.loadNotes} 
          notes={this.props.notes} 
          
          createNotebook={this.props.createNotebook}
          saveNotebook={this.props.saveNotebook}
          deleteNotebook={this.props.deleteNotebook}

          createNote={this.props.createNote}
          saveNote={this.props.saveNote}
          deleteNote={this.props.deleteNote}/>

				<StatsList stats={this.props.stats} loadStats={this.props.loadStats}/>
			</div>
      );
    }
  }
  
const HomeContainer = ReactRedux.connect(
  (state) => ({
    stats: state.stats,
	  notebooks: state.notebooks,
    notes: state.notes
  }),
  createActionDispatchers(statsActionCreators, notebooksActionCreators, notesActionCreators)
)(Home);
module.exports = HomeContainer;
