import React from "react";

interface taskType {
  id: number;
  taskName: string;
  taskType: string;
  isCompleted: boolean;
}

interface TaskDisplayProps {
  tasks: taskType[] | {}[];
  type: string;
  number: number;
  handleTaskStatusChange: (id: number) => void;
}

export const TaskDisplay: React.FC<TaskDisplayProps> = (
  props: any
): JSX.Element => {

  let taskToDisplay = props.tasks.filter((task: taskType): boolean => {
    return task.taskType === props.type;
  });

  // find the status overall completion
  let isCompleted: boolean = taskToDisplay.every((task: taskType) => {
    return task.isCompleted === true;
  });

  return (
    <div>
      <div>
        <i
          className={`bi bi-${props.number}-circle-fill`}
          style={{
            fontSize: "1.5rem",
          }}
        ></i>
        {props.type}{" "}
        {isCompleted && taskToDisplay.length !== 0 && (
          <i className="bi bi-check-circle-fill"></i>
        )}
        {taskToDisplay &&
          taskToDisplay.map((task: taskType) => (
            <div key={task.id}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked={task.isCompleted}
                  onChange={() => props.handleTaskStatusChange(task.id)}
                />
                <label className="form-check-label">{task.taskName}</label>
              </div>
            </div>
          ))}
        {taskToDisplay.length === 0 && (
          <div className="text-muted">No Task </div>
        )}
      </div>
    </div>
  );
};
