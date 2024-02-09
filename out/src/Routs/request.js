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
appRouter.post('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Referrer-Policy', 'no-referrer-when-downgrade');
        const redirectURL = 'http://127.0.0.1:3005/oauth';
        const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
        const authorizeURL = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
            prompt: 'consent'
        });
        res.json({ url: authorizeURL });
    });
});
exports.default = appRouter;
