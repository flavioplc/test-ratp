import express from 'express';
import { CommonRouterConfig } from "../common/common.router.config";
import ToiletsController from "../controllers/toilets.controllers"
export class ToiletRouter extends CommonRouterConfig {
    configureRoutes(): express.Application {
        this.app
        .route(`/toilets`)
        .get(ToiletsController.listToilets)

        return this.app;
    }
    constructor(app: express.Application) {
        super(app, 'ToiletsRouter');
    }
}