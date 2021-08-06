const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const statsActionCreators = require('../reducers/stats');
const StatsView = require('./StatsView');

/*

*/
class StatsList extends React.Component {
  constructor(props) {
    super(props);
	  this.props.loadStats();
  }

  render() {

  const refreshStats = () => {
    this.props.loadStats();
  };

	return (
        <div>
          <h2>Stats</h2>
          <ul>
		  <StatsView
              stats={this.props.stats.data}
              onRefresh={refreshStats}
            />
          </ul>
        </div>
      );
    }
  }

module.exports = StatsList;
