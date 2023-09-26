import { Link } from 'react-router-dom';
import styles from './Errors.module.css';

function UnexpectedError({ error }) {
  console.error(error);

  return (
    <div className={styles.textCenter}>
      <h1>Oops!</h1>
      <p>
        Sorry, an unexpected error has occurred:
        {' '}
        <i>{error?.message || 'Unknown error'}</i>
      </p>

      <Link to="/">Go Home</Link>
    </div>
  );
}

export default UnexpectedError;
