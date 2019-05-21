import React, { useState } from 'react';
import './App.css';
import Todo from './components/todo';
import Header from './components/header';
import Auth from './components/auth';
import AuthContext from './components/authContext';
const app  =()=>{

  const [authShow, toggle]=useState(true);
  const [status, statusChange] = useState(false);

  const todoHandle=()=>{
    toggle(false);
  }

  const authHandle=()=>{
    toggle(true);
  }

  const login=()=>{
    statusChange(true);
  }

  return (
      <div className="App">
      <AuthContext.Provider value={{ status: status, login: login }} >
          <Header todoHandle={todoHandle} authHandle={authHandle} />
          <hr />
          {!authShow?<Todo />:null}
          <hr />
          {authShow?<Auth />:null}
      </AuthContext.Provider>
      </div>
  );
}

export default app;
