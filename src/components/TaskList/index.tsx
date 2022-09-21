import { FiTrash2 } from "react-icons/fi";

import styles from "./taskList.module.css";

interface TasksProps {
  id: string;
  title: string;
  isComplete: boolean;
}

interface Tasks {
  taskInfos: TasksProps;
  changeStatus: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function TaskList({ taskInfos, changeStatus, deleteTask }: Tasks) {
  return (
    <div className={taskInfos.isComplete === false ? styles.listTasks : styles.completedTask}>
      <div className={styles.onlyTask}>
        <label>
          <input 
            readOnly
            type="radio" 
            title="task" 
            checked={taskInfos.isComplete} 
            onClick={() => changeStatus(taskInfos.id)}
          />
          <span>
            {taskInfos.title}
          </span>
        </label>
        <div className={styles.taskButtonDelete}>
          <button onClick={() => deleteTask(taskInfos.id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
