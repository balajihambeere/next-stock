import express, { Router } from 'express';
import sectorRoute from './modules/sector/sector.route';

class AppRoutes {
    public routes: Router = express.Router();
    constructor() {
        this.routes.use("/", sectorRoute);
    };
}

export default new AppRoutes().routes;