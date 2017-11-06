import React from 'react';

const ConsoleOutput = ({ attachRef }) => {
  return (
    <section ref={attachRef} className="sidebar--output bottom-pane">
      <div id="output" className="sidebar--output--messages">
        <p className="sidebar--output--messages--default-message">
          {'// console output:'}
        </p>
      </div>
    </section>
  );
};

export default ConsoleOutput;
