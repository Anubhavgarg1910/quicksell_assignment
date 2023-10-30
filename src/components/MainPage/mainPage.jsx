import Card from "../Card/card";
import { useData } from "../../hooks/useData";
import styles from "./mainPage.module.css";
import ExtractData from "../../shared/extractData";
import {
  sortTicketsByTitle,
  sortTicketsByPriority,
} from "../../shared/sorting";
import { ReactComponent as AddIcon } from "../../shared/icons/add.svg";
import { ReactComponent as DotsIcon } from "../../shared/icons/more_horiz_FILL.svg";
import { trimTitle } from "../../shared/trimTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = ({ selectedGrouping, selectedOrdering }) => {
  const data = useData();
  const tickets = data?.tickets;
  const showFirstToast = () => {
    toast.info("Add option will be launched soon.", {
      theme: "dark",
    });
  };
  const showSecondToast = () => {
    toast.warn("Oops! We are working on edit option.", {
      theme: "dark",
    });
  };

  const extractedData = ExtractData();

  let mappingData;
  if (extractedData) {
    if (selectedGrouping === "User") {
      mappingData = extractedData?.userData;
    } else if (selectedGrouping === "Priority") {
      mappingData = extractedData?.priorityData;
    } else {
      mappingData = extractedData?.statusData;
    }
  }

  let sortedTickets;
  if (selectedOrdering === "Title") {
    sortedTickets = sortTicketsByTitle(tickets);
  } else if (selectedOrdering === "Priority") {
    sortedTickets = sortTicketsByPriority(tickets);
  } else {
    sortedTickets = tickets;
  }

  return (
    <>
      {mappingData?.map((item, index) => (
        <div key={index} className={styles.columnContainer}>
          <div className={styles.columnHeader}>
            <div className={styles.headerLeft}>
              <div
                className={styles.cursorPointer}
                onClick={() => toast.success(`${item.name} selected.`)}
              >
                {item.logo}
              </div>
              <div className={styles.padLeft}>{item.name}</div>
              <div className={styles.padLeft}>{item.size}</div>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.cursorPointer} onClick={showFirstToast}>
                <AddIcon />
              </div>
              <div className={styles.cursorPointer} onClick={showSecondToast}>
                <DotsIcon />
              </div>
            </div>
          </div>
          <div className={styles.columnContent}>
            {sortedTickets?.map((card) => {
              const userIcon = extractedData?.userData?.find(
                (user) => user?.id === card?.userId
              );
              const priorityIcon = extractedData?.priorityData?.find(
                (user) => user?.id === card?.priority
              );
              const statusIcon = extractedData?.statusData?.find(
                (user) => user?.id === card?.status
              );
              if (selectedGrouping === "User" && item.id === card.userId) {
                return (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={trimTitle(card?.title)}
                    tag={card.tag[0]}
                    topIcon={null}
                    midIcon={statusIcon ? statusIcon?.logo : null}
                    bottomIcon={priorityIcon ? priorityIcon?.logo : null}
                  />
                );
              } else if (
                selectedGrouping === "Priority" &&
                item.id === card.priority
              ) {
                return (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={trimTitle(card?.title)}
                    tag={card.tag[0]}
                    topIcon={userIcon ? userIcon?.logo : null}
                    midIcon={statusIcon ? statusIcon?.logo : null}
                    bottomIcon={null}
                  />
                );
              } else if (
                selectedGrouping === "Status" &&
                item.id === card.status
              ) {
                return (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={trimTitle(card?.title)}
                    tag={card.tag[0]}
                    topIcon={userIcon ? userIcon?.logo : null}
                    midIcon={null}
                    bottomIcon={priorityIcon ? priorityIcon?.logo : null}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      ))}
      <ToastContainer />
    </>
  );
};

export default MainPage;
