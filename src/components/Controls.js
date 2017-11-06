import React from 'react';

const Controls = () => {
  return (
    <section className="main--controls">
      <button
        className="main--controls--button run-code"
        id="run-code"
        title="Ctrl + Enter">
        Run Code
      </button>
      <button
        className="main--controls--button previous"
        id="previous"
        title="Ctrl + Shift + <">
        Previous
      </button>
      <button
        className="main--controls--button next"
        id="next"
        title="Ctrl + Shift + >">
        Next
      </button>
    </section>
  );
};

export default Controls;
