const React = require('react');

/**
 */

/**
 */
const StatsView = (props) => {
  return ( 
  <div className="neverwrote-stats">
      <a role="button" title="Refresh"
        style={{ paddingRight: '8px' }}
        onClick={ props.onRefresh }
      >
      <span className="fa fa-refresh" />
    </a>
        <table>
        <thead>
        <tr>
          <td>Statistic</td>
          <td>Value</td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>Note Counts</td>
            <td>{props.stats.noteCount}</td>
          </tr>
          <tr>
            <td>Notebook Counts</td>
            <td>{props.stats.notebookCount}</td>
          </tr>
          <tr>
            <td>Oldest Note</td>
            <td>{props.stats.oldestNotebook}</td>
          </tr>
          <tr>
            <td>Recently Updated Note</td>
            <td>{props.stats.recentlyUpdatedNote}</td>
          </tr>
      </tbody>
       </table>
    </div>
  );
};

module.exports = StatsView;