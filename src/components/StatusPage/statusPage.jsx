import Card from "../Card/card";
import fetchData from "../../shared/fetchData";
import { useEffect, useState } from "react";

import styles from "../../shared/styles/page.module.css";

import {
  sortTicketsByTitle,
  sortTicketsByPriority,
} from "../../shared/sorting";
import { ReactComponent as AddIcon } from "../../shared/icons/add.svg";
import { ReactComponent as DotsIcon } from "../../shared/icons/more_horiz_FILL.svg";
import { ReactComponent as CheckCircleIcon } from "../../shared/icons/check_circle.svg";
import { ReactComponent as CircleIcon } from "../../shared/icons/circle_FILL.svg";
import { ReactComponent as ClockIcon } from "../../shared/icons/timelapse_FILL0.svg";
import { ReactComponent as CancelIcon } from "../../shared/icons/cancel.svg";
import { ReactComponent as BackIcon } from "../../shared/icons/backlog.svg";
import { ReactComponent as User1 } from "../../shared/icons/user1.svg";
import { ReactComponent as User2 } from "../../shared/icons/user2.svg";
import { ReactComponent as User3 } from "../../shared/icons/user3.svg";
import { ReactComponent as User4 } from "../../shared/icons/user4.svg";
import { ReactComponent as User5 } from "../../shared/icons/user5.svg";
import { ReactComponent as NoPriorityIcon } from "../../shared/icons/nopriority.svg";
import { ReactComponent as UrgentIcon } from "../../shared/icons/urgentp.svg";
import { ReactComponent as HighIcon } from "../../shared/icons/highp.svg";
import { ReactComponent as MediumIcon } from "../../shared/icons/mediump.svg";
import { ReactComponent as LowIcon } from "../../shared/icons/lowp.svg";

const StatusPage = ({ selectedOrdering }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData().then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, []);

  const tickets = data?.tickets;

  const ticketStatus = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

  const StatusTickets = ticketStatus.reduce((result, status) => {
    result[status.toLowerCase().replace(" ", "") + "Tickets"] = tickets?.filter(
      (val) => val?.status === status
    );
    return result;
  }, {});

  const {
    backlogTickets,
    todoTickets,
    inprogressTickets,
    doneTickets,
    cancelledTickets,
  } = StatusTickets;

  const test = [
    { name: "Backlog", size: backlogTickets?.length, logo: <BackIcon /> },
    { name: "Todo", size: todoTickets?.length, logo: <CircleIcon /> },
    {
      name: "In progress",
      size: inprogressTickets?.length,
      logo: <ClockIcon />,
    },
    { name: "Done", size: doneTickets?.length, logo: <CheckCircleIcon /> },
    { name: "Cancelled", size: cancelledTickets?.length, logo: <CancelIcon /> },
  ];

  const userIcons = [
    { id: "usr-1", icon: <User1 /> },
    { id: "usr-2", icon: <User2 /> },
    { id: "usr-3", icon: <User3 /> },
    { id: "usr-4", icon: <User4 /> },
    { id: "usr-5", icon: <User5 /> },
  ];

  const tagIcons = [
    { id: 0, icon: <NoPriorityIcon /> },
    { id: 4, icon: <UrgentIcon /> },
    { id: 3, icon: <HighIcon /> },
    { id: 2, icon: <MediumIcon /> },
    { id: 1, icon: <LowIcon /> },
  ];

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
      {test?.map((item, index) => (
        <div key={index} className={styles.columnContainer}>
          <div className={styles.columnHeader}>
            <div className={styles.headerLeft}>
              <div>{item.logo}</div>
              <div
                style={{
                  paddingLeft: "5%",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  paddingLeft: "4%",
                }}
              >
                {item.size}
              </div>
            </div>
            <div className={styles.headerRight}>
              <div>
                <AddIcon />
              </div>
              <div>
                <DotsIcon />
              </div>
            </div>
          </div>
          <div className={styles.columnContent}>
            {sortedTickets?.map((card) => {
              if (item.name === card.status) {
                const userIcon = userIcons.find(
                  (user) => user.id === card.userId
                );
                const tagIcon = tagIcons.find(
                  (user) => user.id === card.priority
                );
                return (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    tag={card.tag[0]}
                    userIcon={userIcon ? userIcon.icon : null}
                    tagIcon={tagIcon ? tagIcon?.icon : null}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default StatusPage;
