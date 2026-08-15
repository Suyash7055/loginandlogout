import express from 'express';
import { registerUser, getUser, login, updateUser } from './src/Controllers/userController.mjs';
import { authenticateToken } from './src/auth/authentication.mjs';
const router = express.Router();
router.get('/', (req, res) => {
  res.send('Authentication route');
});
router.post('/register', registerUser);
router.get('/users/:id', authenticateToken, getUser);
router.post('/login', login);
router.put('/users/:id', authenticateToken, updateUser);
export default router;