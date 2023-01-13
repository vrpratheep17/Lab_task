import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Component/Navbar";
import { Task } from "./Component/Task";
import "./App.css";

interface ITaskStatusChangeCache {
  totalFoundationTask: number;
  totalDiscoveryTask: number;
  totalDeliveryTask: number;
  completedFoundationTask: number;
  completedDiscoveryTask: number;
  completedDeliveryTask: number;
}

interface ITask {
  id: number;
  taskName: string;
  taskType: string;
  isCompleted: boolean;
}

const App: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskType, setTaskType] = useState<string>("Foundation");
  const [statusChangeCache, setStatusChangeCache] =
    useState<ITaskStatusChangeCache>({
      totalFoundationTask: 0,
      totalDiscoveryTask: 0,
      totalDeliveryTask: 0,
      completedFoundationTask: 0,
      completedDiscoveryTask: 0,
      completedDeliveryTask: 0,
    });
  const [tasks, setTasks] = useState<ITask[]>([]);

  // fetch from local storage and set to state
  useEffect(() => {
    // update the state if local storage is not empty
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks") || ""));
      setStatusChangeCache(
        JSON.parse(localStorage.getItem("statusChangeCache") || "")
      );
    }
  }, []);

  const didMount = React.useRef(false);

  // update local storage when state changes and check the completion status
  useEffect(() => {
    console.log("just mounted");
    if (didMount.current) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem(
        "statusChangeCache",
        JSON.stringify(statusChangeCache)
      );
      // check if all task is completed
      let isAllTaskCompleted = tasks.every((task: ITask) => task.isCompleted);
      if (isAllTaskCompleted && tasks.length > 0) {
        axios
          .get("https://uselessfacts.jsph.pl/random.json")
          .then((response) => {
            alert(response.data.text);
          })
          .catch((error) => {
            alert("Something went wrong");
          });
      }
    } else didMount.current = true;
  }, [tasks, statusChangeCache]);

  // task status change
  let handleTaskStatusChange = (id: number) => {
    // find the task
    const task = tasks.find((task: ITask) => task.id === id);

    // if task is not found
    if (!task) {
      // throw error
      throw new Error("Task not found");
    }

    if (task.taskType == "Foundation") {
      // if task isCompleted is switched from true to false reset all other type task status to false
      if (task.isCompleted) {
        // prompt user to confirm
        if (
          window.confirm(
            "Undo the task status will reset the other task status. Are you sure?"
          )
        ) {
          // reset all other type task status to false
          const newTasks = tasks.map((task: ITask) => {
            if (task.taskType != "Foundation" || task.id === id) {
              return {
                ...task,
                isCompleted: false,
              };
            }

            return task;
          });

          setTasks(newTasks);

          // update statusChangeCache
          setStatusChangeCache({
            ...statusChangeCache,
            completedFoundationTask:
              statusChangeCache.completedFoundationTask - 1,
            completedDiscoveryTask: 0,
            completedDeliveryTask: 0,
          });
        }
      } else {
        // update the task status to opp based on the id
        const newTasks = tasks.map((task: ITask) => {
          if (task.id === id) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          }

          return task;
        });

        setTasks(newTasks);

        // update statusChangeCache
        setStatusChangeCache({
          ...statusChangeCache,
          completedFoundationTask: !task.isCompleted
            ? statusChangeCache.completedFoundationTask + 1
            : statusChangeCache.completedFoundationTask - 1,
        });
      }
    } else if (task.taskType == "Discovery") {
      // check foundation task is completed or not
      if (
        statusChangeCache.totalFoundationTask !=
        statusChangeCache.completedFoundationTask
      ) {
        // alert user to complete foundation task first
        alert("Please complete foundation task first");
        return;
      }

      // if task isCompleted is switched from true to false reset all other type task status to false
      if (task.isCompleted) {
        // prompt user to confirm
        if (
          window.confirm(
            "Undo the task status will reset the other task status. Are you sure?"
          )
        ) {
          // reset all other type task status to false
          const newTasks = tasks.map((task: ITask) => {
            if (task.taskType == "Delivery" || task.id === id) {
              return {
                ...task,
                isCompleted: false,
              };
            }

            return task;
          });

          setTasks(newTasks);

          // update statusChangeCache
          setStatusChangeCache({
            ...statusChangeCache,
            completedDiscoveryTask:
              statusChangeCache.completedDiscoveryTask - 1,
            completedDeliveryTask: 0,
          });
        }
      } else {
        // update the task status to opp based on the id
        const newTasks = tasks.map((task: ITask) => {
          if (task.id === id) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          }

          return task;
        });

        setTasks(newTasks);

        // update statusChangeCache
        setStatusChangeCache({
          ...statusChangeCache,
          completedDiscoveryTask: !task.isCompleted
            ? statusChangeCache.completedDiscoveryTask + 1
            : statusChangeCache.completedDiscoveryTask - 1,
        });
      }
    } else if (task.taskType == "Delivery") {
      // check foundation task is completed or not
      if (
        statusChangeCache.totalFoundationTask !=
        statusChangeCache.completedFoundationTask
      ) {
        // alert user to complete foundation task first
        alert("Please complete foundation task first");
        return;
      } else if (
        statusChangeCache.totalDiscoveryTask !=
        statusChangeCache.completedDiscoveryTask
      ) {
        // alert user to complete discovery task first
        alert("Please complete discovery task first");
        return;
      }

      // update the task status to opp based on the id
      const newTasks = tasks.map((task: ITask) => {
        if (task.id === id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }

        return task;
      });

      setTasks(newTasks);

      // update statusChangeCache
      setStatusChangeCache({
        ...statusChangeCache,
        completedDeliveryTask: !task.isCompleted
          ? statusChangeCache.completedDeliveryTask + 1
          : statusChangeCache.completedDeliveryTask - 1,
      });
    }
  };

  let formOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        taskName: taskName,
        taskType: taskType,
        isCompleted: false,
      },
    ]);

    // update statusChangeCache
    setStatusChangeCache({
      ...statusChangeCache,
      totalDeliveryTask:
        taskType == "Delivery"
          ? statusChangeCache.totalDeliveryTask + 1
          : statusChangeCache.totalDeliveryTask,
      totalDiscoveryTask:
        taskType == "Discovery"
          ? statusChangeCache.totalDiscoveryTask + 1
          : statusChangeCache.totalDiscoveryTask,
      totalFoundationTask:
        taskType == "Foundation"
          ? statusChangeCache.totalFoundationTask + 1
          : statusChangeCache.totalFoundationTask,
    });

    setTaskName("");
    setTaskType("Foundation");
  };

  return (
    <div>
      <Navbar />
      <Task tasks={tasks} handleTaskStatusChange={handleTaskStatusChange} />
      <div className="d-flex justify-content-end m-3 fixed-bottom">
        <div>
          <button
            type="button"
            className="btn btn-primary borderRadius50"
            data-bs-toggle="modal"
            data-bs-target="#FormModal"
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="FormModal"
        aria-labelledby="FormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Add Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  formOnSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Task Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => {
                      setTaskName(e.target.value);
                    }}
                    value={taskName}
                    required
                  />
                  <label htmlFor="recipient-name" className="col-form-label">
                    Task type:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setTaskType(e.target.value);
                    }}
                    required
                    value={taskType}
                  >
                    <option selected disabled>
                      Select the Task Type
                    </option>
                    <option value="Foundation">Foundation</option>
                    <option value="Discovery">Discovery</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary m-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary m-2">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
