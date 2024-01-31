import express from 'express';
import activityLogger from './Middlewares/activityLogger';
import postsRoute from './Routs/postsRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(activityLogger);
// const port = 3005;
const port = process.env.PORT || 3000;

app.use("/posts", postsRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})