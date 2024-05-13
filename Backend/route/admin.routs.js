import express from "express";
import { authenticateUser, authenticateAdmin } from "../middleware/authMiddleware.js";
import { addBook, deleteBook, updateBook } from "../controller/book.controller.js";

const router = express.Router();

router.post("/books/add", authenticateUser, addBook);
router.delete("/books/remove", authenticateUser, deleteBook);
router.put("/books/update", authenticateUser,  updateBook);

export default router;
