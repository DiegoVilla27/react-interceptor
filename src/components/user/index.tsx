import { IUser } from "../../services/user/interface";
import styles from "./styles.module.css";

const User = ({ ...user }: IUser) => {
  return (
    <div
      className={styles.userBox}
      key={user.id.value}
    >
      <img
        className={styles.userImg}
        src={user.picture.large}
        alt={user.name.first}
      />
      <p className={styles.userName}>
        {user.name.first + " " + user.name.last}
      </p>
    </div>
  );
};

export default User;
