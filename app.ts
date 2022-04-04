import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express'

import { CommonRouterConfig } from './common/common.router.config';
import { ToiletRouter } from './routers/toilets.router';
import swaggerDocument  from './swagger';


const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRouterConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};


app.use(expressWinston.logger(loggerOptions));

routes.push(new ToiletRouter(app));


const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default server.listen(port, () => {
    routes.forEach((route: CommonRouterConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });


    console.log(runningMessage);
});