import React, { useState } from 'react';
import "./LoginPage.css";

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  async function handleSubmit(event) {
    event.preventDefault();
     if (!/@stud.ase.ro$/.test(username)) {
       setError("Email must be in the format 'username@stud.ase.ro'");
       return;
     }
    try {
      const response = await fetch('http://localhost:5002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      onLogin(username);
    } catch (error) {
      setError(error.message);
    }

   
  
  }

  let passwordInput;

  function togglePassword() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          ref={input => (passwordInput = input)}
        />
        {/* <button id="showPasswordBtn" onClick={togglePassword}>
          Show Password
        </button> */}
      </label>
      <button type="submit" class="loginBtn">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
// This code will create a new component called LoginPage that you can import and use in other parts of your application. This component will handle the authentication process, it sends a post request to the /api/login endpoint with the payload of the username and the password, it would handle the response of the server and it will handle the error if the login failed.
// It uses the fetch API to send a login request to the server.
// It also saves the token returned by the server in the browser's local storage, so that it can be used for authenticating subsequent requests.
// to use a library or a framework for handling the authentication such as JWT, OAuth, etc.
// make sure to use HTTPS to secure the communication between the client and the server.