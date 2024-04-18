// import React, { useContext, useRef } from 'react';
// import './Login.css';
// import { Link } from 'react-router-dom';
// import { Context } from '../../components/context/Context';
// import axios from 'axios';


// export default function Login() {
//   const userRef = useRef();
//   const passwordRef = useRef();
//   const { dispatch, isFetching } = useContext(Context);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         username: userRef.current.value,
//         password: passwordRef.current.value,
//       });
      
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE" });
//     }
//   };

//   return (
//     <div className="login">
//       <span className="loginTitle">Login</span>
//       <form className="loginForm" onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef} />
        
//         <label>Password</label>
//         <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} />
//         <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
//       </form>
//       <span className="loginRegisterButton">Don't have an account? 
//         <Link className='link' to="/register"> Register</Link>
//       </span>
//     </div>
//   );
// }

import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Context } from '../../components/context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [error, setError] = useState(null);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    toast.error("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      {error && <span className="loginError">{error}</span>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef} />
        
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} />
        <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
        <ToastContainer />
      </form>
      <span className="loginRegisterButton">Don't have an account? 
        <Link className='link' to="/register"> Register</Link>
      </span>
    </div>
  );
}
