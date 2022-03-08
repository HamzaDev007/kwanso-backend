import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';

const app = express();
const port = process.env.SERVER_PORT;

import { createTask, getTasks } from '../src/controllers/task';
import { register, login } from '../src/controllers/auth';
import getUser from '../src/controllers/user';
import verifyAuth from '../src/middlewares/auth';

app.use(express.json());
// These two does not require any authorization.
app.post("/register", register);
app.post("/login", login);

app.use(verifyAuth); 
// All bellow routs are gated. the other way is to pass as a parameter like app.post("/user", verifyAuth, getUser)

app.post("/create-task", createTask);
app.get("/list-tasks", getTasks);
app.get("/user", getUser);

app.listen(port, async () => {
  console.log(`server started at http://localhost:${port}`);
  const uri = process.env.DB_CONNECTION_STRING;
  mongoose.connect(uri)

});
