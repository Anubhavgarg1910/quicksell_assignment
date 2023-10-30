import styles from "./popper.module.css"
import DropDown from "../DropDown/dropdown"
const Popper = ({
  selectedGrouping,
  setSelectedGrouping,
  selectedOrdering,
  setSelectedOrdering,
}) => {
  const groupData = [
    { value: "Status", name: "Status" },
    { value: "User", name: "User" },
    { value: "Priority", name: "Priority" },
  ];
  const orderData = [
    { value: "Priority", name: "Priority" },
    { value: "Title", name: "Title" },
  ];

  return (
    <>
      <div className={styles.popperContainer}>
        <DropDown
          label={"Grouping"}
          category={"grouping"}
          data={groupData}
          selected={selectedGrouping}
          setSelected={setSelectedGrouping}
        />
        <DropDown
          label={"Ordering"}
          category={"ordering"}
          data={orderData}
          selected={selectedOrdering}
          setSelected={setSelectedOrdering}
        />
      </div>
    </>
  );
};
export default Popper;
