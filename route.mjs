import express from 'express';
import { registerUser, getUser, login } from './src/Controllers/userController.mjs';
const router = express.Router();
router.get('/', (req, res) => {
  res.send('Authentication route');
});
router.post('/register', registerUser);
router.get('/users/:id', getUser);
router.post('/login', login);
export default router;