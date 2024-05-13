
import Cart from "../model/cart.model.js";

export const getCart = async(req, res) => {
    try {
        let user = req.user; 
        console.log(user)
        console.log(user._id)
        const cart = await Cart.findOne({user: user._id}).populate('books');
        console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const addBookToCart = async (req, res) => {
    try {
        const { bookId } = req.body;
        const user = req.user;
        let cart = await Cart.findOne({user: user._id});

        if (!cart) {
            cart = new Cart({
                user: userId,
                books: [bookId],
            });
        } else {
            if (!cart.books.includes(bookId)) {
                cart.books.push(bookId);
            }
        }

        await cart.save();

        res.status(200).json({ message: "Book added to cart successfully" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
export const removeBookFromCart = async (req, res) => {
    try {
        const { bookId } = req.body;
        const user = req.user;

        const cart = await Cart.findOne({user: user._id});

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        if (cart.books.includes(bookId)) {
            await Cart.updateOn({ _id: cart._id }, { $pull: { books: bookId } });
            await cart.save();
        }

        res.status(200).json({ message: "Book removed from cart successfully" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};