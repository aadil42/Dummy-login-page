import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/Auth-context';
import Input from '../UI/Input/Input';

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
  if(action.type === 'VALIDATE_INPUT') {
    return {...preState, isValid: action.val.length > 6};
  }
  return preState;
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    isValid: '',
    val: ''
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    isValid: '',
    val: ''
  });

  const emailRef = useRef();
  const passwordRef = useRef();

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
    passwordDispatch({type: 'VALIDATE_INPUT', val: passwordState.val});
    // setPasswordIsValid(passwordState.val.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(!emailState.isValid) {
      emailRef.current.focus();
    }
    if(!passwordState.isValid) {
      passwordRef.current.focus();
    }
    if(emailState.isValid && passwordState.isValid) {
      ctx.onLogin(emailState.val, passwordState.val);
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailRef}
          label="Email"
          type="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.val}
          id="email"
          isValid={emailState.isValid}
        />
        <Input 
          ref={passwordRef}
          label="Password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          value={passwordState.val}
          id="password"
          isValid={passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
