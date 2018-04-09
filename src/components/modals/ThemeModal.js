import React from 'react';

const ThemeModal = ({ header }) => (
  <h2
    className="modal"
    style={{ padding: 20, boxShadow: 'none', opacity: 0.8 }}>
    { header }
  </h2>
)

export default ThemeModal
