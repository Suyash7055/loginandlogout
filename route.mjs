import express from 'express';
import { registerUser, getUser } from './src/Controllers/userController.mjs';
const router = express.Router();
router.get('/', (req, res) => {
  res.send('Authentication route');
});
router.post('/register', registerUser);
router.get('/users/:id', getUser);


export default router;