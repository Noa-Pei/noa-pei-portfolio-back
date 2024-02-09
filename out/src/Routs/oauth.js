"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const google_auth_library_1 = require("google-auth-library");
const appRouter = express_1.default.Router();
function getUserData(access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = yield response.json();
        console.log(data);
    });
}
appRouter.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        try {
            const redirectURL = 'http://127.0.0.1:3005/oauth';
            const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
            const tokenRes = yield oAuth2Client.getToken(code);
            yield oAuth2Client.setCredentials(tokenRes.tokens);
            console.log('Tokens aquired');
            const user = oAuth2Client.credentials;
            console.log('Credentials', user);
            const userData = yield getUserData(user.access_token);
            // res.status(200).json({ user });
            // res.sendStatus(201).end();
            // res.json(userData);
            return res.redirect('http://localhost:3000');
        }
        catch (err) {
            console.log('Error with sign-in with Google');
        }
    });
});
exports.default = appRouter;
