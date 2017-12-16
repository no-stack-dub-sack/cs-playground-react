import { clearConsole } from '../../actions/console';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import '../../styles/console.css';

import {
  ICON_BLACK,
  ICON_DISABLED,
  ICON_WHITE
} from '../../utils/base64';

// button states:

const disabled = {
  background: '#1b1d1a',
  color: '#787577',
  icon: ICON_DISABLED
};

const hover = {
  background: '#ccc',
  color: '#1b1d1a',
  icon: ICON_BLACK
};

const _default = {
  background: '#1b1d1a',
  color: '#ccc',
  icon: ICON_WHITE
};

const re = new RegExp(
  'Fail:|AssertionError|InternalError|RangeError|ReferenceError|EvalError|SyntaxError|TypeError|URIError'
);

class ConsoleOutput extends Component {
  constructor(props) {
    super(props);
    this.state = disabled
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.messages.length) {
      this.setState(disabled);
    } else {
      this.setState(_default);
    }
  }
  handleMouseLeave = () => {
    if (!this.props.messages.length) return;
    this.setState(_default);
  }
  handleMouseEnter = () => {
    if (!this.props.messages.length) return;
    this.setState(hover);
  }
  renderMessages = (msg) => {
    let className = re.test(msg)
      ? 'sidebar--output--messages--message  error'
      : 'sidebar--output--messages--message';
    return (
      <p
        className={className}
        key={shortid.generate()}
        dangerouslySetInnerHTML={{ __html: msg + ' ' }} />
    );
  }
  render() {

    const { background, color, icon } = this.state;
    const margin = { marginBottom: -4 };

    const buttonStyle = {
      background,
      color,
      outline: `1px solid ${color}`
    };

    return (
      <section
        className="sidebar--output bottom-pane"
        ref={this.props.attachRef}>
        <div id="output" className="sidebar--output--messages">
          <div
            className='sidebar--output--clear-console'
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.props.clearConsole}
            style={buttonStyle}>
            Clear <img style={margin} alt="backspace icon" src={icon} />
          </div>
          <p className="sidebar--output--messages--default-message">
            {'// console output / tests:'}
          </p>
          { this.props.messages.map(this.renderMessages) }
        </div>
      </section>
    );
  }
}

ConsoleOutput.propTypes = {
  attachRef: PropTypes.func.isRequired,
  clearConsole: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages: state.consoleOutput
  }
}

export default connect(mapStateToProps, { clearConsole })(ConsoleOutput);
