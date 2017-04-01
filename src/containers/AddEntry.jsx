import React from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../actions';


let AddEntry = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addEntry(input.value));
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

AddEntry = connect()(AddEntry);

export default AddEntry;
