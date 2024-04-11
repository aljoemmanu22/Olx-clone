import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const Firebase = useContext(FirebaseContext)
  const auth = getAuth(Firebase);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      alert('logged In')
    } catch (error) {
      alert('Error signing in:', error.code, error.message);
    }
  }

  const handleSignupClick = () => {
    navigate('/signup');
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img alt='' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignupClick}>Signup</a> {/* Add onClick handler */}
      </div>
    </div>
  );
}

export default Login;
