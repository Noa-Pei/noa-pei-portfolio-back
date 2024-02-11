import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {OAuth2Client, Credentials} from 'google-auth-library';

const appRouter = express.Router();

async function getUserData(access_token: string){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log(data);
    return data;
}

appRouter.get('/', async function (req: Request, res: Response, next){
    const code = req.query.code as string | undefined;
    try{
        const redirectURL = 'http://127.0.0.1:3005/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
        );
        const tokenRes = await oAuth2Client.getToken(code!);
        await oAuth2Client.setCredentials(tokenRes.tokens as Credentials);
        console.log('Tokens aquired')
        const user = oAuth2Client.credentials;
        console.log('Credentials', user)
        const userData = await getUserData(user.access_token!);
        res.status(200).send({ user, userData });
        // return res.redirect('http://localhost:3000');
    }catch(err){
        console.log('Error with sign-in with Google')
    }
});

export default appRouter;


        // res.sendStatus(201).end();
        // res.json(userData);




