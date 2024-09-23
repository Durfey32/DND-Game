import auth from '../utils/auth';
const login = async ({username, password}) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });
  
      const data = await response.json();
      
        
      if (!response.ok) {
        throw new Error('Player information not retrieved, check network tab!');
        
      }
  
      // auth.setToken(data.token);
      return data;
    } catch (err) {
      console.log('Error from player login: ', err);
      return Promise.reject('Could not fetch player info');
    }
  };
  
  export { login };