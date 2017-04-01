import React, { PropTypes } from 'react';

const generateList = ({ userId, onGenerateClick }) =>

  <button onClick={onGenerateClick}>Get Events</button>;

export default generateList;
