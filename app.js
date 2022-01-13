import express from 'express';
import dotenv from 'dotenv';
import userRouter  from './routes/userRouter.js'

dotenv.config();

const app = express();



app.use('/user', express.json(), userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server Running")
})



