import { useMemo } from "react";
import { TaskList } from "../TaskList";

import clipboard from "../../assets/clipboard.svg";

import styles from "./tasks.module.css";

interface TasksProps {
  id: string;
  title: string;
  isComplete: boolean;
}

interface Tasks {
  tasks: TasksProps[];
  onChangeStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Tasks({ tasks, onChangeStatus, onDeleteTask }: Tasks) {
  const finishedTasks = useMemo(() => {
    return tasks.reduce(function (finished, task) {
      return task.isComplete === true ? finished + 1 : 0;
    }, 0);
  }, [tasks]);

  return (
    <div className={styles.tasksWrapper}>
      <div className={styles.createdTasksWrapper}>
        <div className={styles.createdTasks}>
          <strong>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </div>

        <div className={styles.finishedTasks}>
          <strong>Concluídas</strong>
          <span>
            {finishedTasks} de {tasks.length}
          </span>
        </div>
      </div>
      { tasks.length === 0 ? (
        <div className={styles.noTaskContainer}>
          <div className={styles.noTask}>
            <img src={clipboard} alt="clipboard" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        </div>
      ) : (
        tasks.map((task) => {
          return (
            <TaskList
              key={task.id}
              taskInfos={task}
              changeStatus={onChangeStatus}
              deleteTask={onDeleteTask}
            />
          );
        })
      )}
    </div>
  );
}
