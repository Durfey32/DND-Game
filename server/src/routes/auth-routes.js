import { Router, } from 'express'; 
import jwt from 'jsonwebtoken';  
import bcrypt from 'bcrypt';  
import { Player } from '../models/players.js';


export const login = async (req, res) => {
  try {
  const { username, password } = req.body;  
 
  const user = await Player.findOne({
    where: { username },
  });

  
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
 
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  if (!secretKey) {
    return res.status(500).json({ message: 'JWT secret key is not set in environment variables' });
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  return res.json({ token }); 
} catch (error) {
  console.error('Error in login:', error);
  return res.status(500).json({ error: 'Failed to login' });
}
};

const router = Router();


router.post('/login', login); 

export default router;  
