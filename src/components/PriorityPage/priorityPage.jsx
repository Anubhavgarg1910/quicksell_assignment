import { ReactComponent as AddIcon } from "../../shared/icons/add.svg";
import { ReactComponent as DotsIcon } from "../../shared/icons/more_horiz_FILL.svg";
import Card from "../Card/card";
import fetchData from "../../shared/fetchData";
import { useEffect, useState } from "react";
import styles from "../../shared/styles/page.module.css";
import {
  sortTicketsByTitle,
  sortTicketsByPriority,
} from "../../shared/sorting";

import { ReactComponent as CheckCircleIcon } from "../../shared/icons/check_circle.svg";
import { ReactComponent as CircleIcon } from "../../shared/icons/circle_FILL.svg";
import { ReactComponent as ClockIcon } from "../../shared/icons/timelapse_FILL0.svg";
import { ReactComponent as CancelIcon } from "../../shared/icons/cancel.svg";
import { ReactComponent as BackIcon } from "../../shared/icons/backlog.svg";

import { ReactComponent as NoPriorityIcon } from "../../shared/icons/nopriority.svg";
import { ReactComponent as UrgentIcon } from "../../shared/icons/urgentp.svg";
import { ReactComponent as HighIcon } from "../../shared/icons/highp.svg";
import { ReactComponent as MediumIcon } from "../../shared/icons/mediump.svg";
import { ReactComponent as LowIcon } from "../../shared/icons/lowp.svg";

import { ReactComponent as User1 } from "../../shared/icons/user1.svg";
import { ReactComponent as User2 } from "../../shared/icons/user2.svg";
import { ReactComponent as User3 } from "../../shared/icons/user3.svg";
import { ReactComponent as User4 } from "../../shared/icons/user4.svg";
import { ReactComponent as User5 } from "../../shared/icons/user5.svg";

const PriorityPage = ({ selectedOrdering }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData().then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, []);
  const tickets = data?.tickets;

  const ticketPriority = [0, 1, 2, 3, 4];
  const PriorityTickets = ticketPriority.reduce((result, priority) => {
    result["P" + priority.toString() + "Tickets"] = tickets?.filter(
      (val) => val?.priority === priority
    );
    return result;
  }, {});

  const { P0Tickets, P1Tickets, P2Tickets, P3Tickets, P4Tickets } =
    PriorityTickets;

  const test = [
    {
      id: 0,
      name: "No priority",
      size: P0Tickets?.length,
      logo: <NoPriorityIcon />,
    },
    { id: 4, name: "Urgent", size: P4Tickets?.length, logo: <UrgentIcon /> },
    { id: 3, name: "High", size: P3Tickets?.length, logo: <HighIcon /> },
    {
      id: 2,
      name: "Medium",
      size: P2Tickets?.length,
      logo: <MediumIcon />,
    },
    { id: 1, name: "Low", size: P1Tickets?.length, logo: <LowIcon /> },
  ];

  const userIcons = [
    { id: "usr-1", icon: <User1 /> },
    { id: "usr-2", icon: <User2 /> },
    { id: "usr-3", icon: <User3 /> },
    { id: "usr-4", icon: <User4 /> },
    { id: "usr-5", icon: <User5 /> },
  ];
  const titleIcons = [
    { id: "Backlog", icon: <BackIcon /> },
    { id: "Todo", icon: <CircleIcon /> },
    { id: "In progress", icon: <ClockIcon /> },
    { id: "Done", icon: <CheckCircleIcon /> },
    { id: "Cancelled", icon: <CancelIcon /> },
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
              if (item.id === card.priority) {
                const userIcon = userIcons.find(
                  (user) => user.id === card.userId
                );
                const titleIcon = titleIcons.find(
                  (user) => user.id === card.status
                );

                return (
                  <Card
                    key={card.id}
                    id={card?.id}
                    title={card?.title}
                    tag={card?.tag[0]}
                    userIcon={userIcon ? userIcon?.icon : null}
                    titleIcon={titleIcon ? titleIcon?.icon : null}
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

export default PriorityPage;
