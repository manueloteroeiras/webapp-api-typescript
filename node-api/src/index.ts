import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes'

const PORT = process.env.PORT || 8080
const app  = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/api/v0',routes)

app.listen(PORT, () => console.log(`Api it's running on PORT: ${PORT}`))