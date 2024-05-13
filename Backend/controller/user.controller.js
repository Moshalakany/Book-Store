import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
export const signup = async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ _id: user._id.toString(),fullname: user.fullname, email: user.email,isAdmin:user.isAdmin, },process.env.SecretKey,{expiresIn: "1h"});
        if (!user.tokens) {
            user.tokens = [];
      }  
        user.tokens = user.tokens.concat({ token });
        console.log(token)
        await user.save();

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                token:token,
                isAdmin:user.isAdmin,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const editName = async (req, res) => {
    try {
    const { newName } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    user.fullname = newName;
    await user.save();
    res.status(200).json({
        message: "Name updated successfully",
        user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        },
    });
    } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
    }
};
export const editPassword = async (req, res) => {
    try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }  
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid old password" });
    }

    const hashPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({
        message: "Password updated successfully",
    });
    } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
    }
};