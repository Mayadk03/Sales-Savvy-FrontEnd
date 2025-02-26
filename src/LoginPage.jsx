import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
     const [successMessage,setSuccessMessage]= useState(null)
      const [error, setError] = useState(null)
      const navigate = useNavigate();

    const handleSignIn = async(e)=> {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9090/api/user/login" , {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({username,password}),
                credentials: 'include'
            });
            const data = await response.json();

            if(response.ok) {
                setSuccessMessage(data.message)
            }
            if(data.role === 'CUSTOMER') {
                    navigate("/customerhome")
                }
             else {
                    navigate('/')
                }
            
        } catch (error) {
            setError(error.error)
        }
    }
  return (
    <div>
      <form onSubmit={handleSignIn}>
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

        <label htmlFor='password'>Password</label>
        <input 
        type='password' 
        required 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Enter password....'
        id='password'>
        </input>
        <br></br>
        <button type='submit'>SignIn Here</button>
        {error && <p style={{color: "red"}}>{error}</p>}
        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
      </form>
        <p>New User ? <a href='/register'>SignUp here</a></p>
    </div>
  )
}
