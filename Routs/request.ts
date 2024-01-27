import express, { Request, Response } from 'express';

// const appExpress = express();
const appRouter = express.Router()

appRouter.get('/', function(req, res, next) {
    res.send('respond with a source');
});

module.exports = appRouter;
