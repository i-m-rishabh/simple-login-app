import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Input from '../Input.js';

function emailReducer(state,action){
  if(action.type === 'USER_INPUT'){
    return{
      value:action.value,
      isValid:state.isValid
    }
  }
  if(action.type === 'INPUT_BLUR'){
    return{
      value:state.value,
      isValid:action.value.includes('@')
    }
  }
}
function passwordReducer(password,action){
  return({
    password:action.password,
    isValid:action.isValid
  })
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispatchEmail] = useReducer(emailReducer,{value:'', isValid:null});
  const [password, dispatchPassword] = useReducer(passwordReducer,{password:'', isValid:null});


  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type:'USER_INPUT',
      value:event.target.value,
    })
    // setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && password.password.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      password:event.target.value,
      isValid:event.target.value.trim().length > 6
    })
    // setEnteredPassword(event.target.value);

    setFormIsValid(
      // enteredEmail.includes('@') && event.target.value.trim().length > 6
      email.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({
      type:'INPUT_BLUR',
      value:email.value
    })
  };

  // const validatePasswordHandler = () => {
  //   setPasswordIsValid(enteredPassword.trim().length > 6);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    ctx.onLogin(email.value, password.password);
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            email.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          {/* <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          /> */}
          <Input
            type="email"
            id="email"
            // value={enteredEmail}
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ''
            password.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            // value={enteredPassword}
            value={password.password}
            onChange={passwordChangeHandler}
            // onBlur={validatePasswordHandler}
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
