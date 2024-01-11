import express from 'express';
import activityLogger from './Middlewares/activityLogger';
import postsRoute from './Routs/postsRoutes';

const app = express();
app.use(express.json());
app.use(activityLogger);
const port = 3005;

app.use("/posts", postsRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})