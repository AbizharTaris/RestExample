import bodyParser from 'body-parser';
import express from 'express';
import config from '../config/config';
import userRoute from './routes/user';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/', userRoute);

app.listen(port, () => {
  console.log(`App Running at ${port}`);
});

export default app;
