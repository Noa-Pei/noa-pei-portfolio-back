import express from 'express';
import activityLogger from './src/Middlewares/activityLogger';
import postsRoute from './src/Routs/postsRoutes';
import userRoute from './src/Routs/userRoutes';
import requestRoute from './src/Routs/request';
import oauthRoute from './src/Routs/oauth';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(activityLogger);
// const port = 3005;
const port = process.env.PORT || 3006;

app.use("/posts", postsRoute);
app.use("/users", userRoute);

app.use("/request", requestRoute)
app.use("/oauth", oauthRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app;

