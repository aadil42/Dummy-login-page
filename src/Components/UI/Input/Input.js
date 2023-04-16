import React from 'react';

// importing css
import classes from './Input.module.css';

const Input = (props) => {
    return (
        <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={props.type}
          id={props.id}
          value={props.val}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    );
}

export default Input;