import React, { PropTypes } from 'react';

const generateList = ({ onGenerateClick }) =>

  <button onClick={onGenerateClick}>Get Events</button>;


generateList.propTypes = {
  onGenerateClick: PropTypes.func.isRequired,
};

export default generateList;
