import express from 'express';
import { getCart,addBookToCart,removeBookFromCart } from '../controller/cart.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();
 
router.get('/', authenticateUser, getCart);
router.post('/add', authenticateUser, addBookToCart); 
router.delete('/delete',authenticateUser,removeBookFromCart);
export default router;
