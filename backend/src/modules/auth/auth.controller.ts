import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import { ResponseModel } from "../../utils/ResponseModel";

const JWT_SECRET = process.env.JWT_SECRET!;

class AuthController {
    registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ error: "User already exists" });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await User.create({ name, email, password: hashedPassword });

            res.status(201).json({ message: "User registered successfully" });
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 500
            } as ResponseModel);
        }
    };

    loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ error: "Invalid email or password" });

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

            // Generate JWT
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ token });
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 500
            } as ResponseModel);
        }
    };
}

export default AuthController;
