import { validationResult } from "express-validator";

export const handleInputError = (req: any, res: any, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}