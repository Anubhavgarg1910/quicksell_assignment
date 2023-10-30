import styles from "./popper.module.css"
import DropDown from "../DropDown/dropdown"
const Popper = ({
  selectedGrouping,
  setSelectedGrouping,
  selectedOrdering,
  setSelectedOrdering,
}) => {
  const groupData = [
    {key:"status", value: "Status", name: "Status" },
    {key:"user", value: "User", name: "User" },
    {key:"priority", value: "Priority", name: "Priority" },
  ];
  const orderData = [
    {key:"priority", value: "Priority", name: "Priority" },
    {key:"title", value: "Title", name: "Title" },
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
