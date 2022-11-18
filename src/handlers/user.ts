import prisma from "../db";
import { comparePassword, generateToken, hashPassword } from "../modules/auth";

export const createUser = async (req: any, res: any, next: any) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.create({
            data: {
                username,
                password: await hashPassword(password),
            },
        });
        res.json({ user, token: generateToken(user) });
    }
    catch (err) {
        err.type = 'input';
        next(err);
    }
}


export const login = async (req: any, res: any) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (user) {
        const isMatch = await comparePassword(password, user.password);
        if (isMatch) {
            res.json({ token: generateToken(user) });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
}
