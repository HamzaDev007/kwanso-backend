import { Request, Response } from 'express';
import taskModel from '../schemas/task.model';
import Task from '../interfaces/task';
const createTask = async (req: Request, res: Response) => {
 const body: Task = req.body;
 try {
  if (!body) res.send(JSON.stringify({ message: 'Name is required' }))
  else {
   const task = await taskModel.findOne({ name: body })
   if (task) res.send(JSON.stringify({ message: `${task.name} already exist.` }))
   else {
    const task = await taskModel.create(req.body);
    res.send(JSON.stringify(task))
   }
  }
 } catch (error) {
  res.send(JSON.stringify({ message: error.message }))
 }
}
const getTasks = async (req: Request, res: Response) => {
 try {
  const tasks = await taskModel.find().lean();
  res.send(JSON.stringify({ tasks: tasks }))
 } catch (error) {
  res.send(JSON.stringify({ message: error.message }))
 }
}

export { createTask, getTasks }