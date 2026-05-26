import TodoList from "@/app/components/TodoList";
import styles from "./page.module.css";

const Home = () => (
  <div className={styles.container}>
    <main className={styles.main}>
      <TodoList />
    </main>
  </div>
);

export default Home;
