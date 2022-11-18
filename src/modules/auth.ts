import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const generateToken = (user: any) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
}

export const protect = (req: any, res: any, next: any) => {
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith('Bearer ')) {
        const token = bearer.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    res.status(401).json({ error: err });
                    return;
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(401).json({ message: 'No token provided' });
            return;
        }
    } else {
        res.status(401).json({ message: 'Not Authorized' });
        return;
    }
}

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}