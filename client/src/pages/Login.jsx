

function Login() {
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