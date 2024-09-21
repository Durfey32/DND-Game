import React, { useState } from 'react';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';

function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await login(loginData);
          Auth.login(data.token)
          console.log('Logged in');
        } catch (err) {
          console.error('Failed to login', err);
        }
      };

  return (
    <div className='form-container'>
    <form className='form login-form' onSubmit={handleSubmit}>
      <h1>Login</h1>
      {/* Username input field */}
      <div className="form-group">
        <label>Username</label>
        <input 
          className="form-input"
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      </div>
      {/* Password input field */}
      <div className="form-group">
        <label>Password</label>
        <input 
          className="form-input"
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
      </div>
      {/* Submit button for the login form */}
      <div className="form-group">
        <button className="btn btn-primary" type='submit'>Login</button>
      </div>
    </form>
  </div>
  );
}
export default Login;