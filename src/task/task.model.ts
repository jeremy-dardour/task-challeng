import * as mongoose from 'mongoose';
import Task from './task.interface';

const taskSchema = new mongoose.Schema({
  completed: Boolean,
  description: String,
  shouldBeDoneOn: Date,
  shouldBeRemindedOn: Date,
  title: String,
});

const Task = mongoose.model<Task & mongoose.Document>('Task', taskSchema);

export default Task;
