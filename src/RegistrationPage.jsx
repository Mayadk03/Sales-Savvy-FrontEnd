import React, { useState } from 'react';
import './assets/Styles/RegistrationPage.css';

export default function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch('http://localhost:9090/api/user/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });
      
      const data = await response.json();

      if (response.ok) {
        console.log('User registered successfully:', data);
        // Redirect to login page
        window.location.href = '/';
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='page-layoutr'>
      <div className="page-containerr">
      <div className="form-containerr">
        <h1 className="form-titler">Register</h1>
        {error && <p className="error-messager">{error}</p>}
        <form onSubmit={handleSignUp} className="form-contentr">
          <div className="form-groupr">
            <label htmlFor="username" className="form-labelr">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-inputr"
            />
          </div>
          <div className="form-groupr">
            <label htmlFor="email" className="form-labelr">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-inputr"
            />
          </div>
          <div className="form-groupr">
            <label htmlFor="password" className="form-labelr">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-inputr"
            />
          </div>
          <div className="form-groupr">
            <label htmlFor="role" className="form-labelr">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="form-selectr"
            >
              <option value="" disabled>Select your role</option>
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="form-buttonr">Sign Up</button>
        </form>
        <p className="form-footerr">
          Already a user?{' '}
          <a href="/" className="form-linkr">Log in here</a>
        </p>
      </div>
    </div>
    </div>
  );
}
