
import App, { AppConfig, AppDependencies } from "./src/app";
import express, { Application } from "express";

const createApp = (): Application => {
    const config: AppConfig = {
        database: {
            url: process.env.MONGODB_URL || 'mongodb://admin:adminpassword@localhost:27017/nextstockdb?authSource=admin'
        }
    };

    const dependencies: AppDependencies = {
        express: express(),
        config: config
    };

    const app = new App(dependencies);
    return app.getApp();
};

export default createApp;
