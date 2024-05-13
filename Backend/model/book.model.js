import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    author: String,
    quantity: {
        type: Number
    },

    sale: {
        type: Number,
        default: 0
    },
});
const Book = mongoose.model("Book", bookSchema);

export default Book;