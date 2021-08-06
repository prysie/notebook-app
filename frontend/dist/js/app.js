(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * This is the entry point for the JavaScript application which runs in the
 * web browser. We call `window.main` when the page loads, and use that
 * opportunity to create the Redux store and mount the root React component.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var createStore = require('./helpers/createStore');
var Root = React.createFactory(require('./components/Root'));

// Initialisation function which we will call on page load
window.main = function (initialState) {
  // Create root React component with Redux store
  var store = createStore(initialState);
  var rootComponent = Root({ store: store });

  // Mount React root component in DOM
  var mountPoint = document.getElementById('root');
  ReactDOM.render(rootComponent, mountPoint);
};

},{"./components/Root":12,"./helpers/createStore":18,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactRedux = require('react-redux');

var Note = require('./Note');

var ActiveNotebook = function (_React$Component) {
  _inherits(ActiveNotebook, _React$Component);

  function ActiveNotebook(props) {
    _classCallCheck(this, ActiveNotebook);

    return _possibleConstructorReturn(this, (ActiveNotebook.__proto__ || Object.getPrototypeOf(ActiveNotebook)).call(this, props));
  }

  _createClass(ActiveNotebook, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Function which creates a note component from a Note ID
      var createNoteComponent = function createNoteComponent(currentNote) {
        return React.createElement(Note, {
          key: currentNote.id,
          note: currentNote,
          saveNote: _this2.props.saveNote,
          createNote: _this2.props.createNote,
          deleteNote: _this2.props.deleteNote
        });
      };

      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'notes-main' },
          this.props.nbnotes.map(createNoteComponent)
        )
      );
    }
  }]);

  return ActiveNotebook;
}(React.Component);

module.exports = ActiveNotebook;

},{"./Note":6,"react":"react","react-redux":"react-redux"}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReduxDevtools = require('redux-devtools');
var DockMonitor = require('redux-devtools-dock-monitor').default;
var LogMonitor = require('redux-devtools-log-monitor').default;

var InternalDevTools = ReduxDevtools.createDevTools(React.createElement(
  DockMonitor,
  { toggleVisibilityKey: 'h', changePositionKey: 'q', defaultIsVisible: false },
  React.createElement(LogMonitor, null)
));

var DevTools = function (_React$Component) {
  _inherits(DevTools, _React$Component);

  function DevTools(props) {
    _classCallCheck(this, DevTools);

    var _this = _possibleConstructorReturn(this, (DevTools.__proto__ || Object.getPrototypeOf(DevTools)).call(this, props));

    _this.state = { isMounted: false };
    return _this;
  }

  _createClass(DevTools, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ isMounted: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.isMounted && React.createElement(InternalDevTools, null)
      );
    }
  }], [{
    key: 'instrument',
    value: function instrument() {
      return InternalDevTools.instrument.apply(InternalDevTools, arguments);
    }
  }]);

  return DevTools;
}(React.Component);

/**
 * Redux development tools (useful for debugging).
 */


module.exports = DevTools;

},{"react":"react","redux-devtools":"redux-devtools","redux-devtools-dock-monitor":"redux-devtools-dock-monitor","redux-devtools-log-monitor":"redux-devtools-log-monitor"}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

var React = require('react');
var ReactRedux = require('react-redux');
var createActionDispatchers = require('../helpers/createActionDispatchers');
var NotebookList = require('./NotebookList');
var StatsList = require('./StatsList');
var notebooksActionCreators = require('../reducers/notebooks');
var notesActionCreators = require('../reducers/notes');
var statsActionCreators = require('../reducers/stats');

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'neverwrote-header' },
          React.createElement(
            'h1',
            { className: 'neverwrote-title' },
            'Neverwrote - Virtual Notes'
          )
        ),
        React.createElement(NotebookList, {
          notebooks: this.props.notebooks,
          loadNotes: this.props.loadNotes,
          notes: this.props.notes,

          createNotebook: this.props.createNotebook,
          saveNotebook: this.props.saveNotebook,
          deleteNotebook: this.props.deleteNotebook,

          createNote: this.props.createNote,
          saveNote: this.props.saveNote,
          deleteNote: this.props.deleteNote }),
        React.createElement(StatsList, { stats: this.props.stats, loadStats: this.props.loadStats })
      );
    }
  }]);

  return Home;
}(React.Component);

var HomeContainer = ReactRedux.connect(function (state) {
  return {
    stats: state.stats,
    notebooks: state.notebooks,
    notes: state.notes
  };
}, createActionDispatchers(statsActionCreators, notebooksActionCreators, notesActionCreators))(Home);
module.exports = HomeContainer;

},{"../helpers/createActionDispatchers":17,"../reducers/notebooks":20,"../reducers/notes":21,"../reducers/stats":22,"./NotebookList":10,"./StatsList":13,"react":"react","react-redux":"react-redux"}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

/**
 * A markdown editor. Markdown is a very simple language for formatting
 * text that can be converted into HTML.
 */

var MarkdownEditor = function (_React$Component) {
  _inherits(MarkdownEditor, _React$Component);

  function MarkdownEditor() {
    _classCallCheck(this, MarkdownEditor);

    return _possibleConstructorReturn(this, (MarkdownEditor.__proto__ || Object.getPrototypeOf(MarkdownEditor)).apply(this, arguments));
  }

  _createClass(MarkdownEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // SimpleMDE must be required here since it's browser-only.
      var SimpleMDE = require('simplemde');

      // Turn our plain old text area into a beautiful markdown editor
      this.simpleMDE = new SimpleMDE({
        indentWithTabs: false,
        status: false,
        autoDownloadFontAwesome: false,
        element: this.textarea
      });

      // Put initial text in the editor
      this.simpleMDE.value(this.props.value);

      // Listen for changes and fire a callback
      this.simpleMDE.codemirror.on('change', function () {
        var newText = _this2.simpleMDE.value();
        if (newText !== _this2.props.value) {
          _this2.props.onChange({ target: { value: newText } });
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // Replace the text in the editor, preserving the cursor position and
      // selection info
      var selections = this.simpleMDE.codemirror.listSelections();
      this.simpleMDE.value(this.props.value);
      this.simpleMDE.codemirror.setSelections(selections);
    }

    // Describe how to render the component

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var ref = function ref(element) {
        _this3.textarea = element;
      };
      return React.createElement('textarea', { ref: ref });
    }
  }]);

  return MarkdownEditor;
}(React.Component);

// Export the component so that it can be required


module.exports = MarkdownEditor;

},{"react":"react","simplemde":"simplemde"}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var NoteEdit = require('./NoteEdit');
var NoteView = require('./NoteView');

var Note = function (_React$Component) {
  _inherits(Note, _React$Component);

  function Note(props) {
    _classCallCheck(this, Note);

    // Set initial internal state for this component
    var _this = _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).call(this, props));

    _this.state = { editing: false };
    return _this;
  }

  _createClass(Note, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var openEdit = function openEdit() {
        _this2.setState({ editing: true });
      };

      var openNew = function openNew() {
        _this2.setState({ create: true });
      };

      var closeEdit = function closeEdit() {
        _this2.setState({ editing: false });
      };

      var closeNew = function closeNew() {
        _this2.setState({ create: false });
      };

      var saveEdit = function saveEdit(editedNote) {
        _this2.props.saveNote(editedNote, function (err) {
          if (!err) closeEdit();
        });
      };

      var createNote = function createNote(newNote) {
        _this2.props.createNote(newNote, function (err) {
          if (!err) closeEdit();
        });
      };

      var deleteThisNote = function deleteThisNote() {
        _this2.props.deleteNote(_this2.props.note.id);
      };

      if (this.state.editing) {
        return React.createElement(NoteEdit, {
          note: this.props.note,
          onSave: saveEdit,
          onCancel: closeEdit
        });
      }
      if (this.state.create) {
        return React.createElement(NoteEdit, {
          note: {},
          onSave: createNote,
          onCancel: closeNew
        });
      }
      return React.createElement(NoteView, {
        note: this.props.note,
        onDelete: deleteThisNote,
        onEdit: openEdit,
        onCreate: openNew
      });
    }
  }]);

  return Note;
}(React.Component);

// Export the Note component


module.exports = Note;

},{"./NoteEdit":7,"./NoteView":8,"react":"react"}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash');

var MarkdownEditor = require('./MarkdownEditor');

var NoteEdit = function (_React$Component) {
  _inherits(NoteEdit, _React$Component);

  function NoteEdit(props) {
    _classCallCheck(this, NoteEdit);

    var _this = _possibleConstructorReturn(this, (NoteEdit.__proto__ || Object.getPrototypeOf(NoteEdit)).call(this, props));

    var note = props.note || {};

    _this.state = {
      title: note.title || '',
      content: note.content || ''
    };
    return _this;
  }

  _createClass(NoteEdit, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var revertAndStopEditing = function revertAndStopEditing(event) {
        event.preventDefault();
        _this2.props.onCancel();
      };

      var submitAndStopEditing = function submitAndStopEditing(event) {
        event.preventDefault();
        // Creates a new note object and saves it.
        var editedNote = _.assign({}, _this2.props.note, {
          title: _this2.state.title,
          content: _this2.state.content
        });
        _this2.props.onSave(editedNote);
      };

      var onChangeContent = function onChangeContent(event) {
        _this2.setState({ content: event.target.value });
      };

      var onTitleChange = function onTitleChange(event) {
        _this2.setState({ title: event.target.value });
      };

      return React.createElement(
        'form',
        { className: 'neverwrote-note' },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { className: 'form-control input-lg', value: this.state.title,
            placeholder: 'Note title', onChange: onTitleChange
          })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(MarkdownEditor, {
            value: this.props.note.content, onChange: onChangeContent })
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            onClick: submitAndStopEditing
          },
          'Save'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            style: { marginRight: '12px' },
            onClick: revertAndStopEditing
          },
          'Cancel'
        )
      );
    }
  }]);

  return NoteEdit;
}(React.Component);

module.exports = NoteEdit;

},{"./MarkdownEditor":5,"lodash":"lodash","react":"react"}],8:[function(require,module,exports){
"use strict";

var React = require('react');

/**
 * Render edit/delete buttons and note timestamp.
 *
 * List of props: note, time, onEdit, onDelete
 */
var NoteMeta = function NoteMeta(props) {
  return React.createElement(
    "div",
    { className: "neverwrote-note-meta" },
    React.createElement(
      "a",
      { role: "button", title: "Create note",
        style: { paddingRight: '8px' },
        onClick: props.onCreate
      },
      React.createElement("span", { className: "fa fa-plus-square" })
    ),
    React.createElement(
      "a",
      { role: "button", title: "Edit note",
        style: { paddingRight: '8px' },
        onClick: props.onEdit
      },
      React.createElement("span", { className: "fa fa-edit" })
    ),
    React.createElement(
      "a",
      { role: "button", title: "Delete note",
        style: { paddingRight: '8px' },
        onClick: props.onDelete
      },
      React.createElement("span", { className: "fa fa-remove" })
    )
  );
};

/**
 * A read-only view of a blog note.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 */
var NoteView = function NoteView(props) {
  return React.createElement(
    "div",
    { className: "neverwrote-note" },
    React.createElement(
      "h2",
      { className: "neverwrote-note-title" },
      props.note.title
    ),
    React.createElement(NoteMeta, props),
    React.createElement(
      "div",
      { className: "neverwrote-note-content" },
      props.note.content
    )
  );
};

module.exports = NoteView;

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash');

/**
 * A form for editing a blog Note.
 */

var NotebookEdit = function (_React$Component) {
  _inherits(NotebookEdit, _React$Component);

  function NotebookEdit(props) {
    _classCallCheck(this, NotebookEdit);

    var _this = _possibleConstructorReturn(this, (NotebookEdit.__proto__ || Object.getPrototypeOf(NotebookEdit)).call(this, props));

    var notebook = props.notebook || {};

    _this.state = {
      title: notebook.title || ''
    };
    return _this;
  }

  _createClass(NotebookEdit, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var revertAndStopEditing = function revertAndStopEditing(event) {
        event.preventDefault();
        _this2.props.onCancel();
      };

      var submitAndStopEditing = function submitAndStopEditing(event) {
        event.preventDefault();
        // Creates a new notebook object and saves it.
        var editedNotebook = _.assign({}, _this2.props.notebook, {
          title: _this2.state.title
        });
        _this2.props.onSave(editedNotebook);
      };

      var onTitleChange = function onTitleChange(event) {
        _this2.setState({ title: event.target.value });
      };

      return React.createElement(
        'form',
        { className: 'neverwrote-notebook' },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { className: 'form-control input-lg', value: this.state.title,
            placeholder: 'Notebook title', onChange: onTitleChange
          })
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            onClick: submitAndStopEditing
          },
          'Save'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            style: { marginRight: '12px' },
            onClick: revertAndStopEditing
          },
          'Cancel'
        )
      );
    }
  }]);

  return NotebookEdit;
}(React.Component);

module.exports = NotebookEdit;

},{"lodash":"lodash","react":"react"}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var NotebookEdit = require('./NotebookEdit');
var NotebookView = require('./NotebookView');
var ActiveNotebook = require('./ActiveNotebook');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

var NotebookList = function (_React$Component) {
  _inherits(NotebookList, _React$Component);

  function NotebookList() {
    _classCallCheck(this, NotebookList);

    return _possibleConstructorReturn(this, (NotebookList.__proto__ || Object.getPrototypeOf(NotebookList)).apply(this, arguments));
  }

  _createClass(NotebookList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var createNotebookListItem = function createNotebookListItem(nbdata) {

        if (nbdata.id === _this2.props.notes.activeNotebookId) {
          return React.createElement(ActiveNotebook, { key: nbdata.id,
            notebook: nbdata,
            nbnotes: _this2.props.notes.data,
            saveNote: _this2.props.saveNote,
            deleteNote: _this2.props.deleteNote,
            createNote: _this2.props.createNote
          });
        }

        return React.createElement(NotebookView, {
          key: nbdata.id,
          notebook: nbdata,
          loadNotes: _this2.props.loadNotes,
          createNotebook: _this2.props.createNotebook,
          saveNotebook: _this2.props.saveNotebook,
          deleteNotebook: _this2.props.deleteNotebook
        });
      };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Notebooks'
        ),
        React.createElement(
          'ul',
          null,
          this.props.notebooks.data.map(createNotebookListItem)
        )
      );
    }
  }]);

  return NotebookList;
}(React.Component);

module.exports = NotebookList;

},{"./ActiveNotebook":2,"./NotebookEdit":9,"./NotebookView":11,"react":"react"}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactRedux = require('react-redux');
var NotebookEdit = require('./NotebookEdit');

var NotebookMenu = function NotebookMenu(props) {
	return React.createElement(
		'div',
		{ className: 'neverwrote-notebook-menu' },
		React.createElement(
			'a',
			{ role: 'button', title: 'Create notebook',
				style: { paddingRight: '8px' },
				onClick: props.onCreate
			},
			React.createElement('span', { className: 'fa fa-plus-square' })
		),
		React.createElement(
			'a',
			{ role: 'button', title: 'Edit notebook',
				style: { paddingRight: '8px' },
				onClick: props.onEdit
			},
			React.createElement('span', { className: 'fa fa-edit' })
		),
		React.createElement(
			'a',
			{ role: 'button', title: 'Delete notebook',
				style: { paddingRight: '8px' },
				onClick: props.onDelete
			},
			React.createElement('span', { className: 'fa fa-remove' })
		)
	);
};

var NotebookView = function (_React$Component) {
	_inherits(NotebookView, _React$Component);

	function NotebookView(props) {
		_classCallCheck(this, NotebookView);

		// Set initial internal state for this component
		var _this = _possibleConstructorReturn(this, (NotebookView.__proto__ || Object.getPrototypeOf(NotebookView)).call(this, props));

		_this.state = { editing: false, create: false };
		return _this;
	}

	_createClass(NotebookView, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var onClickNotebook = function onClickNotebook(event) {
				event.preventDefault();
				_this2.props.loadNotes(_this2.props.notebook.id);
			};
			var openNew = function openNew() {
				_this2.setState({ create: true });
			};

			var closeNew = function closeNew() {
				_this2.setState({ create: false });
			};

			var openEdit = function openEdit() {
				_this2.setState({ editing: true });
			};

			var closeEdit = function closeEdit() {
				_this2.setState({ editing: false });
			};

			var createNotebook = function createNotebook(newNotebook) {
				_this2.props.createNotebook(newNotebook, function (err) {
					if (!err) closeEdit();
				});
			};

			var deleteThisNotebook = function deleteThisNotebook() {
				_this2.props.deleteNotebook(_this2.props.notebook.id);
			};

			var saveEdit = function saveEdit(editedNotebook) {
				_this2.props.saveNotebook(editedNotebook, function (err) {
					if (!err) closeEdit();
				});
			};

			var createNotebookEdit = function createNotebookEdit() {
				console.log('createBoteBooks edit');
				if (_this2.props.editing == true) {
					return React.createElement(NotebookEdit, {
						notebook: _this2.props.notebook,
						onSave: saveEdit,
						onCancel: closeEdit
					});
				}

				if (_this2.props.create == true) {
					return React.createElement(NotebookEdit, {
						notebook: {},
						onSave: saveEdit,
						onCancel: closeNew,
						onDelete: deleteThisNotebook
					});
				}
			};
			return React.createElement(
				'li',
				null,
				React.createElement(NotebookMenu, _defineProperty({
					onEdit: openEdit,
					onCreate: openNew,
					onDelete: deleteThisNotebook,
					onCancel: closeNew
				}, 'onDelete', deleteThisNotebook)),
				createNotebookEdit,
				React.createElement(
					'a',
					{ href: '#', onClick: onClickNotebook },
					this.props.notebook.title
				)
			);
		}
	}]);

	return NotebookView;
}(React.Component);

module.exports = NotebookView;

},{"./NotebookEdit":9,"react":"react","react-redux":"react-redux"}],12:[function(require,module,exports){
'use strict';

/**
 * The root React component from which all other components on the page are
 * descended. It is this component which is directly mounted on the DOM.
 */

var React = require('react');
var ReactRedux = require('react-redux');

var Provider = ReactRedux.Provider;
var Home = require('./Home');

// Enable development tools when in development mode
var DevTools = 'span';
if ("development" === 'development') {
  DevTools = require('./DevTools');
}

// Define the Root component
var Root = function Root(props) {
  return (
    /* The Provider gives descendants the ability to connect to the Redux store */
    React.createElement(
      Provider,
      { store: props.store },
      React.createElement(
        'div',
        null,
        React.createElement(Home, null),
        React.createElement(DevTools, null)
      )
    )
  );
};

module.exports = Root;

},{"./DevTools":3,"./Home":4,"react":"react","react-redux":"react-redux"}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactRedux = require('react-redux');

var createActionDispatchers = require('../helpers/createActionDispatchers');
var statsActionCreators = require('../reducers/stats');
var StatsView = require('./StatsView');

/*

*/

var StatsList = function (_React$Component) {
  _inherits(StatsList, _React$Component);

  function StatsList(props) {
    _classCallCheck(this, StatsList);

    var _this = _possibleConstructorReturn(this, (StatsList.__proto__ || Object.getPrototypeOf(StatsList)).call(this, props));

    _this.props.loadStats();
    return _this;
  }

  _createClass(StatsList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var refreshStats = function refreshStats() {
        _this2.props.loadStats();
      };

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Stats'
        ),
        React.createElement(
          'ul',
          null,
          React.createElement(StatsView, {
            stats: this.props.stats.data,
            onRefresh: refreshStats
          })
        )
      );
    }
  }]);

  return StatsList;
}(React.Component);

module.exports = StatsList;

},{"../helpers/createActionDispatchers":17,"../reducers/stats":22,"./StatsView":14,"react":"react","react-redux":"react-redux"}],14:[function(require,module,exports){
"use strict";

var React = require('react');

/**
 */

/**
 */
var StatsView = function StatsView(props) {
  return React.createElement(
    "div",
    { className: "neverwrote-stats" },
    React.createElement(
      "a",
      { role: "button", title: "Refresh",
        style: { paddingRight: '8px' },
        onClick: props.onRefresh
      },
      React.createElement("span", { className: "fa fa-refresh" })
    ),
    React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            "Statistic"
          ),
          React.createElement(
            "td",
            null,
            "Value"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            "Note Counts"
          ),
          React.createElement(
            "td",
            null,
            props.stats.noteCount
          )
        ),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            "Notebook Counts"
          ),
          React.createElement(
            "td",
            null,
            props.stats.notebookCount
          )
        ),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            "Oldest Note"
          ),
          React.createElement(
            "td",
            null,
            props.stats.oldestNotebook
          )
        ),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            "Recently Updated Note"
          ),
          React.createElement(
            "td",
            null,
            props.stats.recentlyUpdatedNote
          )
        )
      )
    )
  );
};

module.exports = StatsView;

},{"react":"react"}],15:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a set of functions for performing HTTP requests.
 * It will work on both the backend and the frontend.
 */

var ajax = {};

if (true) {
  ajax.request = function (opts) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('error', function () {
        reject(new Error('Request failed'));
      });
      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          reject(new Error('Received status ' + xhr.status));
        } else {
          resolve(opts.json ? JSON.parse(xhr.responseText) : xhr.responseText);
        }
      });
      xhr.open(opts.method, opts.url);
      if (opts.json) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(opts.data !== undefined ? JSON.stringify(opts.data) : opts.data);
      } else {
        xhr.send(opts.data);
      }
    });
  };
} else {
  var request = require('request');

  ajax.request = function (opts) {
    return new Promise(function (resolve, reject) {
      request({
        url: opts.url,
        method: opts.method,
        body: opts.data,
        json: opts.json
      }, function (error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(new Error('Received status ' + response.statusCode));
        } else {
          resolve(body);
        }
      });
    });
  };
}

module.exports = ajax;

},{"request":"request"}],16:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a set of functions for communicating with the
 * backend API. It will work on both the backend and the frontend.
 */

var ajax = require('./ajax');

var api = {};

if (true) {
  api.baseUrl = '/api';
} else {
  api.baseUrl = 'http://api:3000';
}

api.get = function (path) {
  return ajax.request({
    method: 'GET',
    url: this.baseUrl + path,
    json: true
  });
};

api.post = function (path, data) {
  return ajax.request({
    method: 'POST',
    url: this.baseUrl + path,
    json: true,
    data: data
  });
};

api.put = function (path, data) {
  return ajax.request({
    method: 'PUT',
    url: this.baseUrl + path,
    json: true,
    data: data
  });
};

api.delete = function (path) {
  return ajax.request({
    method: 'DELETE',
    url: this.baseUrl + path,
    json: true
  });
};

module.exports = api;

},{"./ajax":15}],17:[function(require,module,exports){
'use strict';

/**
 * Returns a function that, when given a dispatch function, returns an
 * object containing a bunch of action dispatchers.
 */
var createActionDispatchers = function createActionDispatchers() {
  for (var _len = arguments.length, actionCreatorGroups = Array(_len), _key = 0; _key < _len; _key++) {
    actionCreatorGroups[_key] = arguments[_key];
  }

  return function (dispatch) {
    return (
      // Iterate over actionCreatorsArray, which is an array of arrays of action
      // creators
      actionCreatorGroups.reduce(function (actionDispatchers, actionCreators) {
        // Add an action dispatcher for each action creator in actionCreators
        Object.keys(actionCreators).filter(function (name) {
          return typeof actionCreators[name] === 'function';
        }).forEach(function (name) {
          actionDispatchers[name] = function () {
            for (var _len2 = arguments.length, actionCreatorArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              actionCreatorArgs[_key2] = arguments[_key2];
            }

            return dispatch(actionCreators[name].apply(this, actionCreatorArgs));
          };
        });
        return actionDispatchers;
      }, {})
    );
  };
};

module.exports = createActionDispatchers;

},{}],18:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a function for creating the Redux store. In
 * development mode it will also connect up the Redux development tools for
 * debugging purposes.
 */

var Redux = require('redux');
var reduxThunk = require('redux-thunk').default;
var combinedReducers = require('../reducers');

var finalCreateStore = void 0;

if ("development" === 'production') {
  finalCreateStore = Redux.compose(
  // Enables middleware
  Redux.applyMiddleware(reduxThunk))(Redux.createStore);
} else {
  var DevTools = require('../components/DevTools');

  finalCreateStore = Redux.compose(
  // Enables middleware
  Redux.applyMiddleware(reduxThunk),
  // Enables DevTools
  DevTools.instrument())(Redux.createStore);
}

module.exports = function (initialState) {
  return finalCreateStore(combinedReducers, initialState);
};

},{"../components/DevTools":3,"../reducers":19,"redux":"redux","redux-thunk":"redux-thunk"}],19:[function(require,module,exports){
'use strict';

/**
 * Specify all of your reducers in this file, so they can be combined into
 * one big reducer.
 */

var Redux = require('redux');

module.exports = Redux.combineReducers({
  notebooks: require('./notebooks'),
  notes: require('./notes'),
  stats: require('./stats')
});

},{"./notebooks":20,"./notes":21,"./stats":22,"redux":"redux"}],20:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var api = require('../helpers/api');

// Action type constants
var LOAD = 'neverwrote-frontend/notebooks/LOAD';
var UPDATE = 'neverwrote-frontend/notebooks/UPDATE';
var INSERT = 'neverwrote-frontend/notebooks/INSERT';
var CHANGE = 'neverwrote-frontend/notebooks/CHANGE';
var REMOVE = 'neverwrote-frontend/notebooks/REMOVE';

// The initial state of  data
var initialState = {
	notebooks: [{ id: 100, title: 'From Redux Store: A hard-coded notebook' }, { id: 101, title: 'From Redux Store: Another hard-coded notebook' }],
	notes: [{ id: 1001, title: 'From Redux Store: A hard-coded note' }, { id: 1011, title: 'From Redux Store: Another hard-coded note' }],
	activeNotebookId: -1
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {

	state = state || initialState;
	console.log('Notebook reducer state: ' + JSON.stringify(state).replace(/<\//g, "<\\/"));
	action = action || {};
	console.log('Actions called' + action.type);
	switch (action.type) {

		case INSERT:
			{
				var unsortedNotebooks = _.concat(state.notebooks, action.notes);

				var visibleNotebooks = _.orderBy(unsortedNotebooks, 'createdAt', 'desc');

				// Return updated state
				return _.assign({}, state, { visibleNotebooks: visibleNotebooks });
			}

		case LOAD:
			{
				console.log('Load called with notebooks: ' + action.nbdata);
				return _.assign({}, state, { notebooks: action.nbdata });
			}

		case CHANGE:
			{
				var _visibleNotebooks = _.clone(state.notebooks);
				var changedIndex = _.findIndex(state.visibleNotebooks, { id: action.notebook.id });
				visibleNotes[changedIndex] = action.notebook;
				return _.assign({}, state, { visibleNotes: visibleNotes });
			}

		// Removes a single notes from the visible notes list
		case REMOVE:
			{
				var _visibleNotebooks2 = _.reject(state.notebooks, { id: action.id });
				return _.assign({}, state, { visibleNotebooks: _visibleNotebooks2 });
			}

		case UPDATE:
			{

				return _.assign({}, state, { activeNotebookId: action.data });
			}

		default:
			return state;
	}
}

reducer.updateNotebooks = function (data) {
	console.log('Reduceer update called');
	return { type: UPDATE, data: data };
};

reducer.loadNotebooks = function () {
	return function (dispatch) {
		api.get('/notebooks').then(function (nbdata) {
			dispatch({ type: LOAD, nbdata: nbdata });
		}).catch(function (err) {
			console.log(err.stack);
		});
		console.log('exit loadnotebooks ');
	};
};

// Inserts notebook into the notebook list
reducer.insertNotebook = function (notebook) {
	return { type: INSERT, notebook: notebook };
};

reducer.deleteNotebook = function (notebookId) {
	return function (dispatch) {
		api.delete('/notebooks/' + notebookId).then(function () {
			dispatch(reducer.removeNotebook(notebookId));
		}).catch(function (err) {
			console.log(err.stack);
			alert('Failed to delete notebook.');
		});
	};
};

// Attempts to update a notebook on the server and updates local notebook data if
// successful
reducer.saveNotebook = function (editedNotebook, callback) {
	return function (dispatch) {
		api.put('/notebooks/' + editedNotebook.id, editedNotebook).then(function (notebook) {
			// Saves local notebook.
			dispatch(reducer.changeNotebook(notebook));
			callback();
		}).catch(function (err) {
			console.log(err.stack);
			alert('Failed to save notebook.  Are all of the fields filled in correctly?');
		});
	};
};

// Attempts to create a notebook on the server and inserts it into the local notebook
// list if successful
reducer.createNotebook = function (newNotebook) {
	return function (dispatch) {
		api.post('/notebooks', newNotebook).then(function (notebook) {
			// This notebook is one that the store returns us! It has notebook id incremented to the next available id
			dispatch(reducer.insertNotebook([notebook]));
			callback();
		}).catch(function (err) {
			console.log(err.stack);
			alert('Failed to create notebook. Are all of the fields filled in correctly?');
		});
	};
};

// Changes local notebook data
reducer.changeNotebook = function (notebook) {
	return { type: CHANGE, notebook: notebook };
};

// Removes a note from the visible notebook list
reducer.removeNotebook = function (id) {
	return { type: REMOVE, id: id };
};

// Export the action creators and reducer
module.exports = reducer;

},{"../helpers/api":16,"lodash":"lodash"}],21:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var api = require('../helpers/api');

// Action type constants
var LOADNOTES = 'neverwrote-frontend/notes/LOADNOTES';
var INSERT = 'neverwrote-frontend/notes/INSERT';
var CHANGE = 'neverwrote-frontend/notes/CHANGE';
var REMOVE = 'neverwrote-frontend/notes/REMOVE';

// The initial state of note data
var initialState = {
	data: [{ id: 1001, title: 'From Redux Store: A hard-coded note' }, { id: 1011, title: 'From Redux Store: Another hard-coded note' }]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {

	state = state || initialState;
	console.log('Notes reducer state: ' + JSON.stringify(state).replace(/<\//g, "<\\/"));
	action = action || {};
	console.log('Actions called' + action.type);
	switch (action.type) {

		// Inserts new notes into the local store
		case INSERT:
			{
				// Add in the new notes
				// Notice that we do not need to increment the notes id. Since the notes that we
				// are putting in is one that is returned by the api server which already has
				// the id incremented.
				var unsortedNotes = _.concat(state.notes, action.notes);

				var visibleNotes = _.orderBy(unsortedNotes, 'createdAt', 'desc');

				// Return updated state
				return _.assign({}, state, { visibleNotes: visibleNotes });
			}

		case LOADNOTES:
			{
				return _.assign({}, state, { activeNotebookId: action.notebookId, data: action.notes });
			}

		case CHANGE:
			{
				var _visibleNotes = _.clone(state.notes);
				var changedIndex = _.findIndex(state.visibleNotes, { id: action.note.id });
				_visibleNotes[changedIndex] = action.note;
				return _.assign({}, state, { visibleNotes: _visibleNotes });
			}

		// Removes a single notes from the visible notes list
		case REMOVE:
			{
				var _visibleNotes2 = _.reject(state.notes, { id: action.id });
				return _.assign({}, state, { visibleNotes: _visibleNotes2 });
			}
		default:
			return state;
	}
}

// Inserts notes into the notes list
reducer.insertNotes = function (notes) {
	return { type: INSERT, notes: notes };
};

// Attempts to create a note on the server and inserts it into the local note
// list if successful
reducer.createNote = function (newNote, callback) {
	return function (dispatch) {
		api.post('/notes', newNote).then(function (note) {
			// This note is one that the store returns us! It has note id incremented to the next available id
			dispatch(reducer.insertNotes([note]));
			callback();
		}).catch(function (err) {
			console.log(err.stack);
			alert('Failed to create note. Are all of the fields filled in correctly?');
		});
	};
};

reducer.loadNotes = function (notebookId) {
	return function (dispatch) {
		api.get('/notebooks/' + notebookId + '/notes').then(function (notes) {
			dispatch({ type: LOADNOTES, notebookId: notebookId, notes: notes });
		}).catch(function (err) {
			console.log(err.stack);
		});
		console.log('exit load notes ');
	};
};

// Now we define a whole bunch of action creators
// Inserts notes into the note list
reducer.insertNotes = function (notes) {
	return { type: INSERT, notes: notes };
};

reducer.deleteNote = function (noteId) {
	return function (dispatch) {
		api.delete('/notes/' + noteId).then(function () {
			dispatch(reducer.removeNote(noteId));
		}).catch(function () {
			alert('Failed to delete note.');
		});
	};
};

// Attempts to update a note on the server and updates local note data if
// successful
reducer.saveNote = function (editedNote, callback) {
	return function (dispatch) {
		api.put('/notes/' + editedNote.id, editedNote).then(function (note) {
			// Saves local note.
			dispatch(reducer.changeNote(note));
			callback();
		}).catch(function () {
			alert('Failed to save note.  Are all of the fields filled in correctly?');
		});
	};
};

// Attempts to create a note on the server and inserts it into the local note
// list if successful
reducer.createNote = function (newNote, callback) {
	return function (dispatch) {
		api.post('/notes', newNote).then(function (note) {
			// This note is one that the store returns us! It has note id incremented to the next available id
			dispatch(reducer.insertNotes([note]));
			callback();
		}).catch(function () {
			alert('Failed to create note. Are all of the fields filled in correctly?');
		});
	};
};

// Changes local note data
reducer.changeNote = function (note) {
	return { type: CHANGE, note: note };
};

// Removes a note from the visible note list
reducer.removeNote = function (id) {
	return { type: REMOVE, id: id };
};

// Attempts to load more notes from the server and inserts them into the local
// note list if successful
reducer.loadMoreNotes = function (callback) {
	return function (dispatch, getState) {
		var state = _.assign({}, initialState, getState().notes);

		var path = '/notes';

		api.get('/notes').then(function (newNotes) {
			dispatch(reducer.insertNotes(newNotes));
			callback();
		}).catch(function () {
			alert('Failed to load more notes');
			callback('Failed to load more notes');
		});
	};
};

// Export the action creators and reducer
module.exports = reducer;

},{"../helpers/api":16,"lodash":"lodash"}],22:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var api = require('../helpers/api');

// Action type constants
var LOADSTATS = 'neverwrote-frontend/stats/LOADSTATS';

// The initial state of stats data
var initialState = {
	data: [{ "noteCount": 18,
		"notebookCount": 5,
		"oldestNotebook": "Housework",
		"oldestNotebookDate": "2020-11-01T00:10:48.000Z",
		"recentlyUpdatedNote": "Shave the catfghfghfghfgh",
		"recentlyUpdatedNoteDate": "2020-11-04T12:36:51.000Z" }]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {

	state = state || initialState;
	console.log('Stats reducer state: ' + JSON.stringify(state).replace(/<\//g, "<\\/"));
	action = action || {};
	console.log('Actions called' + action.type);
	switch (action.type) {

		case LOADSTATS:
			{
				return _.assign({}, state, { data: action.stats });
			}
		default:
			return state;
	}
}

reducer.loadStats = function () {
	return function (dispatch) {
		api.get('/stats/').then(function (stats) {
			dispatch({ type: LOADSTATS, stats: stats });
		}).catch(function (err) {
			console.log(err.stack);
		});
	};
};

// Export the action creators and reducer
module.exports = reducer;

},{"../helpers/api":16,"lodash":"lodash"}]},{},[1])

//# sourceMappingURL=/assets/js/app.js.map
