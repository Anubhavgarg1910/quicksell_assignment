import styles from "./home.module.css";
import { ReactComponent as SettingsIcon } from "../../shared/icons/settings.svg";
import { ReactComponent as DownIcon } from "../../shared/icons/keyboarddown.svg";
import { useState, useRef } from "react";
import Popper from "../Popper/popper";
import PriorityPage from "../PriorityPage/priorityPage";
import UserPage from "../UserPage/userPage";
import StatusPage from "../StatusPage/statusPage";
import useClickAway from "../../hooks/useClickAway";

const Home = () => {
  const [show, setShow] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("");
  const [selectedOrdering, setSelectedOrdering] = useState("");
  const headerContainerRef = useRef(null);

  useClickAway(headerContainerRef, () => {
    setShow(false);
  });

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <div ref={headerContainerRef} className={styles.headerContainer}>
        <div className={styles.headerContent} onClick={handleClick}>
          <SettingsIcon />
          <div>Display</div>
          <DownIcon />
        </div>
        {show ? (
          <Popper
            selectedGrouping={selectedGrouping}
            selectedOrdering={selectedOrdering}
            setSelectedGrouping={setSelectedGrouping}
            setSelectedOrdering={setSelectedOrdering}
          />
        ) : null}
      </div>
      <>
        <div className={styles.columns}>
          {selectedGrouping === "User" ? (
            <UserPage selectedOrdering={selectedOrdering} />
          ) : selectedGrouping === "Priority" ? (
            <PriorityPage selectedOrdering={selectedOrdering} />
          ) : (
            <StatusPage selectedOrdering={selectedOrdering} />
          )}
        </div>
      </>
    </>
  );
};
export default Home;
