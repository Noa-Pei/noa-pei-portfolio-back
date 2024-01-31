"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activityLogger_1 = __importDefault(require("./Middlewares/activityLogger"));
const postsRoutes_1 = __importDefault(require("./Routs/postsRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(activityLogger_1.default);
// const port = 3005;
const port = process.env.PORT || 3000;
app.use("/posts", postsRoutes_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
