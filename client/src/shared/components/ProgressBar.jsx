import styles from './ProgressBar.module.css';

function ProgressBar() {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progress} />
      </div>
    </div>
  );
}

export default ProgressBar;
