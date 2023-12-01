import styles from "./page.module.css";
import Weather from "./weather/weather";

export default function Home() {
  return (
    <main className={styles.main}>
      <Weather></Weather>
    </main>
  );
}
