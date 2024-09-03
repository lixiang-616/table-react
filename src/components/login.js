// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(event) {
    // event.preventDefault();
    // // 登录逻辑
    // if (username === 'admin' && password === '123456') {
    //   // 登录成功，跳转到 Dashboard
    //   navigate('/dashboard');
    // } else {
    //   alert('Invalid username or password');
    // }
    navigate('/dashboard');
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;