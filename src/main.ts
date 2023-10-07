import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/articleRoutes.js';

const app = express();

app.use(bodyParser.json())
app.use('/', router)

const port = 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
