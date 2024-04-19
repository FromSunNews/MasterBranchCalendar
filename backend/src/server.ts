import express, { Application } from 'express';
import cors from 'cors'
import { apiV1 } from './routes/v1';
import { env } from './assets/config/environment';
import { readFile } from 'fs/promises'
import { EventResponse } from './assets/interfaces/response/event.response';

const getData = async () => {
  return JSON.parse(await readFile(`src/assets/data/data.json`, 'utf8'));
}

export let jsonData: EventResponse[] = []

export const handleNewData = (newData: EventResponse[]) => {
  jsonData = newData
}


const app: Application = express();
const port = env.APP_PORT || 7500;

app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', apiV1);

app.listen(port, async () => {
  console.log(`Server is Fire at http://localhost:${port}`);
  const data = await getData()
  handleNewData(data)
});