interface Task {
  _id: string;
  title: string;
  description: string;
  shouldBeDoneOn: Date;
  shouldBeRemindedOn: Date;
  completed: boolean;
}

export default Task;
