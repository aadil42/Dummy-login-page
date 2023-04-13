import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (preState, action) => {
  if(action.type === 'EMAIL_INPUT') {
    return {...preState, val: action.val};
  }
  if(action.type === "VALIDATE_INPUT") {
    return {...preState, isValid: action.val.includes('@')}
  }
  return preState;
}

const passwordReducer = (preState, action) => {
  if(action.type === 'PASSWORD_INPUT') {
    return {...preState, val: action.val};
  }
  return preState;
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    isValid: '',
    val: ''
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    isValid: '',
    val: ''
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('stimulating network request');
      setFormIsValid(
        emailState.val.includes('@') && passwordState.val.trim().length > 6
      );
    }, 500);
      //aaaaaaaaaa
    return () => {
      console.log('CLEANING');
      clearTimeout(identifier);
    }
  }, [emailState.val, passwordState.val]);

  const emailChangeHandler = (event) => {
    emailDispatch({type: 'EMAIL_INPUT', val: event.target.value});
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({type: 'PASSWORD_INPUT', val: event.target.value});

    // setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    emailDispatch({type: 'VALIDATE_INPUT', val: emailState.val})
    // setEmailIsValid(emailState.val.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(passwordState.val.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.val, passwordState.val);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
