import * as mongoose from 'mongoose';
import Task from '../interfaces/task';
const taskSchema = new mongoose.Schema(
 {
  name: String
 },
 {
  toJSON: {
   virtuals: true,
   getters: true,
  },
 },
);


const taskModel = mongoose.model<Task & mongoose.Document>('Task', taskSchema);
export default taskModel;