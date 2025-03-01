import express, { Router } from 'express';
import AuthController from "./auth.controller";

class AuthRoute {
    private authController: AuthController = new AuthController();
    public routes: Router = express.Router();
    constructor() {
        this.routes.post("/register", this.authController.registerUser);
        this.routes.post("/login", this.authController.loginUser);
    }
}