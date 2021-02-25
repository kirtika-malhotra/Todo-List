import express, { json } from 'express';
import cookieParser from "cookie-parser";
import connectDB from './config/dbConnector';
import todo from './routes/api/Todo';
import user from './routes/api/auth';
import fs from 'fs';
import bodyParser from 'body-parser';
import * as https from 'https';
import * as http from 'http';
import config from 'config';
//import User from './models/User';

const PORT = config.get("serverPort");
const CLIENT_ORIGIN = config.get("clientOrigin");
console.log(PORT);

//**********************************Inits**********************************/
const app = express();
const server = http.createServer(app);
// const server = https.createServer({
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// }, app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.use(json({ extended: false }));
app.use(cookieParser());
// app.use(cors({
//   origin: CLIENT_ORIGIN
// }))->> For prod only, otherwise postman won't work!



//**********************************Routes**********************************/
app.use('/api/todo', todo);
app.use('/api/user', user);

try {
  server.listen(PORT, () => {
    console.log(`Go!`);
  });
} catch (err) {
  console.error(err.message);
  process.exit(ErrorCode.SERVER_START_ERR);
}


