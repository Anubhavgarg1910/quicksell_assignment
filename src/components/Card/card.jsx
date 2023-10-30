import styles from "./card.module.css";

const Card = ({ id, title, tag, topIcon, midIcon, bottomIcon }) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.userDetails}>
            <div className={styles.id}>{id}</div>
            <div>{topIcon}</div>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.midIcon}>{midIcon}</div>
            <div >{title}</div>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.bottomIcon}>{bottomIcon}</div>
            <div className={styles.tagContainer}>
              <div className={styles.circle}></div>
              <div className={styles.tag}>{tag}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
