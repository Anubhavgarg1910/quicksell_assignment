import styles from "./dropdown.module.css";

const DropDown = ({ label, category, data, selected, setSelected }) => {
  return (
    <>
      <div className={styles.dropdownContainer}>
        <div className={styles.label}>{label}</div>
        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            value={selected}
            name={category}
            onChange={(e) => setSelected(e.target.value)}
          >
            {data.map((item, index) => (
              <option className={styles.options} key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default DropDown;
