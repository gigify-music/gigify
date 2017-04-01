import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../actions';


let AddEvent = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addEvent(input.value));
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

AddEvent = connect()(AddEvent);

export default AddEvent;
