
const login = async (playerInfo) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerInfo),
      });
  
      const data = await response.json();
      console.log(playerInfo);
        
      if (!response.ok) {
        throw new Error('Player information not retrieved, check network tab!');
        
      }
  
      return data;
    } catch (err) {
      console.log('Error from player login: ', err);
      return Promise.reject('Could not fetch player info');
    }
  };
  
  export { login };