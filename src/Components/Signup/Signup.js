import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const Firebase = useContext(FirebaseContext)
  const auth = getAuth(Firebase);
  const firestore = getFirestore(Firebase);
  const navigate = useNavigate(); 

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setError(null); // Reset error state

    // Validate inputs
    if (!username || !email || !phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email address');
      return;
    }

    // Validate phone number format (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      setError('Invalid phone number');
      return;
    }

    // Validate password (at least 6 characters)
    const passwordPattern = /^\S{6,}$/; // No spaces, at least 6 characters
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 6 characters long and cannot contain spaces');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential?.user;

      if (user) {
        // Store additional user data in Firestore
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, {
          username: username,
          phone: phone,
          email: email,
        });
        await updateProfile(user, {
          displayName: username,
        });

        // Navigate to the login page after successful registration
        navigate('/login');
      } else {
        setError('Error creating user: User object is undefined');
      }
    } catch (error) {
      setError(`Error creating user: ${error.message}`);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder="Enter username"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder="Enter email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            placeholder="Enter phone number"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder="Enter password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
