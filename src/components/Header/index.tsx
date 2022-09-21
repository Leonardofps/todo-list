import rocket from "../../assets/rocket.svg";
import styles from "./header.module.css";

export function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <img src={rocket} alt="Logo do foguete" />
        <div className={styles.todo}>
          <span>to</span>
          <span>do</span>
        </div>
      </div>
    </div>
  );
}
