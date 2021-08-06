const React = require('react');
const ReactRedux = require('react-redux');
const NotebookEdit = require('./NotebookEdit');

const NotebookMenu = (props) => {
	return (
	  <div className="neverwrote-notebook-menu">
		  <a role="button" title="Create notebook"
		  style={{ paddingRight: '8px' }}
		  onClick={ props.onCreate }
		>
		  <span className="fa fa-plus-square" />
		</a>
		
		<a role="button" title="Edit notebook"
		  style={{ paddingRight: '8px' }}
		  onClick={ props.onEdit }
		>
		  <span className="fa fa-edit" />
		</a>
  
		<a role="button" title="Delete notebook"
		   style={{ paddingRight: '8px' }}
		   onClick={ props.onDelete }
		>
		  <span className="fa fa-remove" />
		</a>
  
	  </div>
	);
  };

class NotebookView extends React.Component {
	constructor(props) {
		super(props);
		// Set initial internal state for this component
		this.state = { editing: false, create: false};
	}

	render() {
		const onClickNotebook = (event) => {
			event.preventDefault();
			this.props.loadNotes(this.props.notebook.id);
		};
		const openNew = () => {
			this.setState({ create: true });
		};
		
		const closeNew = () => {
			this.setState({ create: false });
		};

		const openEdit = () => {
			this.setState({ editing: true });
		};
	  
		const closeEdit = () => {
			this.setState({ editing: false });
		};
	  
		const createNotebook = (newNotebook) => {
			this.props.createNotebook(newNotebook, (err) => {
				if(!err) closeEdit();
			});
		};
		  
		const deleteThisNotebook = () => {
			this.props.deleteNotebook(this.props.notebook.id);
		}; 
	  
		const saveEdit = (editedNotebook) => {
			this.props.saveNotebook(editedNotebook, (err) => {
			  if(!err) closeEdit();
			});
		};
		
		const createNotebookEdit = () => {
			console.log('createBoteBooks edit');
			if(this.props.editing == true) {
				return (<NotebookEdit
					notebook={this.props.notebook}
					onSave={saveEdit}
					onCancel={closeEdit}
				/>)
			}

			if(this.props.create == true) {
				return (<NotebookEdit
					notebook={{}}
					onSave={saveEdit}
					onCancel={closeNew}
					onDelete={deleteThisNotebook}
				/>);
			}
		}
			return (
			<li>
				<NotebookMenu
					onEdit={openEdit}
					onCreate={openNew}
					onDelete={deleteThisNotebook}
					onCancel={closeNew}
					onDelete={deleteThisNotebook}
				/>
				{createNotebookEdit}
				<a href="#" onClick={onClickNotebook}>								
						{this.props.notebook.title}
					</a>
			</li>	
		  );
		  
	}
}
module.exports = NotebookView;