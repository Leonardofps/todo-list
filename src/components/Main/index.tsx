import { v4 as uuid } from "uuid";

import { ChangeEvent, FormEvent, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Tasks } from "../Tasks";

import styles from "./main.module.css";

interface Tasks {
  id: string;
  title: string;
  isComplete: boolean;
}

export function Main() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    const taskId = uuid();

    if (newTaskTitle === "") return;

    setTasks((value) => [
      { id: taskId, title: newTaskTitle, isComplete: false },
      ...value
    ]);

    setNewTaskTitle("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTaskTitle(event.target.value);
  }

  function handleChangeTaskStatus(id: string) {
    const requestATask = tasks.map((task) => {
      if (task.id === id) {
        [...tasks, (task.isComplete = true)];
      }
      return task;
    });

    requestATask.sort(function (a, b) {
      return a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1;
    });

    setTasks(requestATask);
  }

  function handleDeleteTask(id: string) {
    const findTask = tasks.filter((task) => task.id !== id);
    setTasks(findTask);
  } 

  return (
    <div className={styles.wrapper}>
      <div className={styles.formAddToDo}>
        <input
          value={newTaskTitle}
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
        />
        <button type="submit" onClick={handleCreateNewTask}>
          Criar <FiPlusCircle />
        </button>
      </div>

      <Tasks
        tasks={tasks}
        onChangeStatus={handleChangeTaskStatus}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
