import React, { useState } from 'react'

export default function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [role, setRole] = useState("");
  const [successMessage,setSuccessMessage]= useState(null)
  const [error, setError] = useState(null)
const  handleSignUp = async(event) => {
  event.preventDefault()
  setError(null);//Clear previous errors
  setSuccessMessage(null)
  try {
    const response = await fetch("http://localhost:9090/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username,email,password,role}),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User registered successfully:",data)
      setSuccessMessage(data.message)
      window.location.href='/'
      setUsername("")
      setEmail("")
      setPassword("")
      setRole("")
    } else {
      throw new Error(data.error||data.message||"Registration failed");
    }
  } catch (err) {
    setError(err.message);
  }
}

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <label htmlFor='username'>Username</label>
        <input 
        type='text' 
        required 
        placeholder='Enter username....'
        id='username'
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        >
        </input>
        <br></br>

        <label htmlFor='email'>email</label>
        <input 
        type='email' 
        required 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder='Enter email....'
        id='email'>
        </input>
        <br></br>

        <label htmlFor='password'>Password</label>
        <input 
        type='password' 
        //pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&])[a-zA-Z\d@#$%^&]{8,}$' 
        required 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Enter password....'
        title="Password must contain at least 8 characters, 
        including an uppercase letter, 
        a lowercase letter, 
        a number, 
        and a special character (@#$%^&)."
        id='password'>
        </input>
        <br></br>

        

        <label htmlFor='role'>Role </label>
        <select
        id='role'
        required
        value={role}
        onChange={(e)=> setRole(e.target.value)}
        >
          <option value='' disabled>Enter role</option>
          <option value='ADMIN'>ADMIN</option>
          <option value='CUSTOMER'>CUSTOMER</option>
        </select>
        <br></br>

        <button type='submit'>Register</button>
        {error && <p style={{color: "red"}}>{error}</p>}
        {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
      </form>

      <p>Already A user ? {""}<a href='/'>Login Here</a></p>
    </div>
  )
}
