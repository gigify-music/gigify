import React, { PropTypes } from 'react';

const Entry = ({ value }) => (
  <li>
    {value}
  </li>
);

Entry.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Entry;
