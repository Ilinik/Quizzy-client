import styles from './Profile.module.scss';

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <img
        src="/images/profile-picture.png"
        alt="profile-picture"
        className={styles.profilePicture}
      />
      <p className={styles.profileName}>Michael Clifford</p>
    </div>
  );
};
