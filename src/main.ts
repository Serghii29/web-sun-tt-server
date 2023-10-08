import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import articleRoutes from './routes/articleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/', articleRoutes);
app.use('/', adminRoutes);

const port = 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
