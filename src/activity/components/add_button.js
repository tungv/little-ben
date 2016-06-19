import React from 'react';

export const AddActivityButton = ({ text, onClick, ...rest }) => (
  <button onClick={onClick} {...rest}>
    {text}
  </button>
);

AddActivityButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
