
import { jwtDecode } from 'jwt-decode';
class AuthService {
  getProfile() {
  
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      return decoded;
    } else {
      return null;
    }
    

  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
   
   if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        return true;
      } else {
        return false;
      
    }
     
   }


  }

  getToken() {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
