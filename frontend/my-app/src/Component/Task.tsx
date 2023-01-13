import React from "react";
import {} from "react-bootstrap-icons";
import { TaskDisplay } from "./TaskDisplay";

interface taskType {
  id: number;
  taskName: string;
  taskType: string;
  isCompleted: boolean;
}

interface TaskProps {
  tasks: taskType[] | {}[];
  handleTaskStatusChange: (id: number) => void;
}

export const Task: React.FC<TaskProps> = (props): JSX.Element => {
  return (
    <div>
      <div className="container mt-4">
        <h3>My startup progress</h3>
        {/* Foundation */}
        <TaskDisplay
          type="Foundation"
          tasks={props.tasks}
          number={1}
          handleTaskStatusChange={props.handleTaskStatusChange}
        />
        <TaskDisplay
          type="Discovery"
          tasks={props.tasks}
          number={2}
          handleTaskStatusChange={props.handleTaskStatusChange}
        />
        <TaskDisplay
          type="Delivery"
          tasks={props.tasks}
          number={3}
          handleTaskStatusChange={props.handleTaskStatusChange}
        />
      </div>
    </div>
  );
};
