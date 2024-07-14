import User from "../user";
import useUsers from "./hooks";
import styles from "./styles.module.css";

function Users() {
  const { users, loading, error } = useUsers();

  return (
    <>
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.usersBox}>
          <h1 className={styles.usersTitle}>Users List</h1>
          <hr className={styles.usersDivide} />
          {users &&
            users.map((user) => (
              <User
                key={`${user.id.value}${Math.random()}`}
                {...user}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Users;
