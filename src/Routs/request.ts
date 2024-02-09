import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {OAuth2Client} from 'google-auth-library';

const appRouter = express.Router();

appRouter.post('/', async function(req: Request, res: Response, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectURL = 'http://127.0.0.1:3005/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

    const authorizeURL = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    });

    res.json({url:authorizeURL});
});

export default appRouter;
