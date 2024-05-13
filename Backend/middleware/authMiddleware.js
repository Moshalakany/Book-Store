
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SecretKey);

        const user = await User.findOne({ _id: decoded._id/*, 'tokens.token': token*/ });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};
export const authenticateAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized. Admin access required." });
    }
    next();
};
