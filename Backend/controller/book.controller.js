import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
export const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const deletedBook = await Book.findOneAndDelete(bookId);
        res.status(200).json(deletedBook);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
export const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const updateBook = async (req, res) => {
  try {
    const { bookId, name,price, category, image, author ,sale} = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
    return res.status(400).json({ message: "Book not found" });
    }

    if (name) {
    book.name = name;
    }

    if (author) {
    book.author = author;
    }

    if (price) {
    book.price = price;
    }

    if (category) {
    book.category = category;
    }

    if (image) {
    book.image = image;
    }

    if (sale) {
    book.sale = sale;
    }

    await book.save();

    res.status(200).json({
    message: "Book updated successfully",
    book,
    });
} catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
}
};