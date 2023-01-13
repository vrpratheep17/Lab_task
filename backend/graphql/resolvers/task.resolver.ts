const jsonfile = require("jsonfile");
import { v4 as uuidv4, v6 as uuidv6 } from "uuid";

const path = require("path");
const dataPath = path.join(__dirname, "..", "..", "localStorage", "data.json");

const taskResolver = {
  Query: {
    // Get all tasks
    tasks: async (parent, args, context, info) => {
      const data = await jsonfile.readFile(dataPath);
      return data.tasks;
    },
  },
  Mutation: {
    // Add a task
    addTask: async (parent, args, context, info) => {
      const { taskName, taskType, isCompleted } = args;
      // add the value to the local json file
      const task = {
        id: uuidv4(),
        taskName,
        taskType,
        isCompleted,
      };

      const data = await jsonfile.readFile(dataPath);

      data.tasks.push(task);
      await jsonfile.writeFile(dataPath, data);
      return task;
    },
    // Update a task
    updateTask: async (parent, args, context, info) => {
      const { id, taskName, taskType, isCompleted } = args;
      const data = await jsonfile.readFile(dataPath);

      const task = data.tasks.find((task) => task.id == id);

      if (task) {
        task.taskName = taskName;
        task.taskType = taskType;
        task.isCompleted = isCompleted;
        await jsonfile.writeFile(dataPath, data);
        return task;
      }
      return task;
    },
  },
};

export default taskResolver;
