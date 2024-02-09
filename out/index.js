"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activityLogger_1 = __importDefault(require("./src/Middlewares/activityLogger"));
const postsRoutes_1 = __importDefault(require("./src/Routs/postsRoutes"));
const userRoutes_1 = __importDefault(require("./src/Routs/userRoutes"));
const request_1 = __importDefault(require("./src/Routs/request"));
const oauth_1 = __importDefault(require("./src/Routs/oauth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(activityLogger_1.default);
// const port = 3005;
const port = process.env.PORT || 3006;
app.use("/posts", postsRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/request", request_1.default);
app.use("/oauth", oauth_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
