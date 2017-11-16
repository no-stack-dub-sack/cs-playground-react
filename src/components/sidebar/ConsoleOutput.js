import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';
import '../../styles/console.css';

const ConsoleOutput = ({ attachRef, messages }) => {
  messages = messages.map(msg => (
    <p key={shortid.generate()} className="sidebar--output--messages--message">
      {msg}
    </p>
  ));
  return (
    <section ref={attachRef} className="sidebar--output bottom-pane">
      <div id="output" className="sidebar--output--messages">
        <p className="sidebar--output--messages--default-message">
          {'// console output:'}
        </p>
        { messages }
      </div>
    </section>
  );
};

ConsoleOutput.propTypes = {
  attachRef: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages: state.consoleOutput
  }
}

export default connect(mapStateToProps)(ConsoleOutput);
