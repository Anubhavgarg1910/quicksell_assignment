import styles from "./card.module.css";

const Card = ({ id, title, tag, userIcon, titleIcon, tagIcon }) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.userDetails}>
            <div className={styles.id}>{id}</div>
            <div>{userIcon}</div>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.titleIcon}>{titleIcon}</div>
            <div className={styles.title}>{title}</div>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.tagIcon}>{tagIcon}</div>
            <div className={styles.tagContainer}>
              <div className={styles.circle}></div>
              <div>{tag}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
