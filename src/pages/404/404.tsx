import { Link } from "react-router-dom";

import styles from "./404.module.scss";

import { ReactComponent as ErrorImage } from "../../assets/images/404/404.svg";

const Page404 = () => {
  return (
    <div className={styles.image}>
      <ErrorImage />
      <div className={styles.error}>Page doesn't exist</div>
      <Link to="/">Back to main page</Link>
    </div>
  );
};

export default Page404;
