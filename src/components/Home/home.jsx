import styles from "./home.module.css";
import { ReactComponent as SettingsIcon } from "../../shared/icons/settings.svg";
import { ReactComponent as DownIcon } from "../../shared/icons/keyboarddown.svg";
import { useState, useEffect, useRef } from "react";
import Popper from "../Popper/popper";
import useClickAway from "../../hooks/useClickAway";
import MainPage from "../MainPage/mainPage";

const Home = () => {
  const [show, setShow] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("Status");
  const [selectedOrdering, setSelectedOrdering] = useState("");
  const headerContainerRef = useRef(null);

  useClickAway(headerContainerRef, () => {
    setShow(false);
  });

  const handleClick = () => {
    setShow(!show);
  };

  function addQueryParam(key, value) {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    if (searchParams.has(key)) {
      searchParams.set(key, value);
    } else {
      searchParams.append(key, value);
    }
    window.history.replaceState({}, document.title, url.toString());
  }

  const handleGroupingFilterChange = (value) => {
    addQueryParam("grouping", value);
    setSelectedGrouping(value);
  };
  const handleOrderingFilterChange = (value) => {
    addQueryParam("ordering", value);
    setSelectedOrdering(value);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    if (searchParams.has("grouping")) {
      const value = searchParams.get("grouping");
      setSelectedGrouping(value);
    }
    if (searchParams.has("ordering")) {
      const value = searchParams.get("ordering");
      setSelectedOrdering(value);
    }
  }, [window.location.href]);

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
            setSelectedGrouping={handleGroupingFilterChange}
            setSelectedOrdering={handleOrderingFilterChange}
          />
        ) : null}
      </div>
      <>
        <div className={styles.columns}>
          <MainPage
            selectedGrouping={selectedGrouping}
            selectedOrdering={selectedOrdering}
          />
        </div>
      </>
      <hr />
      <div className={styles.footer}>
        Developed by{"\u00a0"}
        <a
          target="blank"
          href="https://www.linkedin.com/in/anubhav-garg-9885471b8/"
        >
          Anubhav Garg
        </a>
      </div>
    </>
  );
};
export default Home;
