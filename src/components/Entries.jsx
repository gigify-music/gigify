import React, { PropTypes } from 'react';
import Entry from './Entry';

const Entries = ({ entries }) => (
  <ul>
    {entries.map(entry =>
      <Entry
        key={entry.value}
        {...entry}
      />,
    )}
  </ul>
);

Entries.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired),
};

export default Entries;
