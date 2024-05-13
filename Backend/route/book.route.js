import express from "express";
import { getBook, deleteBook, addBook,updateBook } from "../controller/book.controller.js";
import { authenticateUser, authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBook);
router.delete("/", authenticateUser, authenticateAdmin, deleteBook);
router.post("/", authenticateUser, authenticateAdmin, addBook);
router.put("/", authenticateUser, authenticateAdmin, updateBook);
export default router;