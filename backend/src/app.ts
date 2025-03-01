import bodyParser from "body-parser";
import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import routes from "./app.routes";
import mongoose from "mongoose";
import { clientErrorHandler, errorHandler, logging } from "./utils/ErrorHandler";
import { setupSwagger } from "./config/swagger.config";
import dotenv from 'dotenv';
dotenv.config();

interface DatabaseConfig {
    url: string;
}

export interface AppConfig {
    database: DatabaseConfig;
}

export interface AppDependencies {
    express: Application;
    config: AppConfig;
}

class App {
    private app: Application;
    private config: AppConfig;

    constructor(dependencies: AppDependencies) {
        this.app = dependencies.express;
        this.config = dependencies.config;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.initializeDatabase();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.use(this.contentTypeValidation);
        // this.app.use(this.acceptHeaderValidation);
        setupSwagger(this.app as express.Express);
    }

    private initializeRoutes(): void {
        this.app.use('/api', routes);
    }

    private initializeErrorHandling(): void {
        this.app.use(logging);
        this.app.use(clientErrorHandler);
        this.app.use(errorHandler);
    }

    private initializeDatabase(): void {
        mongoose.connect(this.config.database.url)
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    private contentTypeValidation = (req: Request, res: Response, next: NextFunction): void => {
        const contentType = req.headers['content-type'];
        if (!contentType || contentType.indexOf('application/json') !== 0) {
            res.sendStatus(415);
            return;
        }
        next();
    }

    private acceptHeaderValidation = (req: Request, res: Response, next: NextFunction): void => {
        const contentType = req.headers['accept'];
        if (!contentType || contentType.indexOf('application/json') !== 0) {
            res.sendStatus(406);
            return;
        }
        next();
    }

    public getApp(): Application {
        return this.app;
    }
}

export default App;
