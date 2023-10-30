import { ReactComponent as CheckCircleIcon } from "../shared/icons/check_circle.svg";
import { ReactComponent as CircleIcon } from "../shared/icons/circle_FILL.svg";
import { ReactComponent as ClockIcon } from "../shared/icons/timelapse_FILL0.svg";
import { ReactComponent as CancelIcon } from "../shared/icons/cancel.svg";
import { ReactComponent as BackIcon } from "../shared/icons/backlog.svg";
import { ReactComponent as User1 } from "../shared/icons/user1.svg";
import { ReactComponent as User2 } from "../shared/icons/user2.svg";
import { ReactComponent as User3 } from "../shared/icons/user3.svg";
import { ReactComponent as User4 } from "../shared/icons/user4.svg";
import { ReactComponent as User5 } from "../shared/icons/user5.svg";
import { ReactComponent as NoPriorityIcon } from "../shared/icons/nopriority.svg";
import { ReactComponent as UrgentIcon } from "../shared/icons/urgentp.svg";
import { ReactComponent as HighIcon } from "../shared/icons/highp.svg";
import { ReactComponent as MediumIcon } from "../shared/icons/mediump.svg";
import { ReactComponent as LowIcon } from "../shared/icons/lowp.svg";
import { useData } from "../hooks/useData";

const ExtractData = () => {
  const data = useData();

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

  const ticketUser = ["usr-1", "usr-2", "usr-3", "usr-4", "usr-5"];

  const UserTickets = ticketUser.reduce((result, userId) => {
    result[userId.replace("-", "") + "Tickets"] = tickets?.filter(
      (val) => val?.userId === userId
    );
    return result;
  }, {});
  const { usr1Tickets, usr2Tickets, usr3Tickets, usr4Tickets, usr5Tickets } =
    UserTickets;

  const ticketPriority = [0, 1, 2, 3, 4];
  const PriorityTickets = ticketPriority.reduce((result, priority) => {
    result["P" + priority.toString() + "Tickets"] = tickets?.filter(
      (val) => val?.priority === priority
    );
    return result;
  }, {});

  const { P0Tickets, P1Tickets, P2Tickets, P3Tickets, P4Tickets } =
    PriorityTickets;

  const namesArray = data?.users?.map((user) => user?.name);

  const extractedData = {
    userData: [
      {
        id: usr1Tickets?.[0]?.userId,
        name: namesArray?.[0],
        size: usr1Tickets?.length,
        logo: <User1 />,
      },
      {
        id: usr2Tickets?.[0]?.userId,
        name: namesArray?.[1],
        size: usr2Tickets?.length,
        logo: <User2 />,
      },
      {
        id: usr3Tickets?.[0]?.userId,
        name: namesArray?.[2],
        size: usr3Tickets?.length,
        logo: <User3 />,
      },
      {
        id: usr4Tickets?.[0]?.userId,
        name: namesArray?.[3],
        size: usr4Tickets?.length,
        logo: <User4 />,
      },
      {
        id: usr5Tickets?.[0]?.userId,
        name: namesArray?.[4],
        size: usr5Tickets?.length,
        logo: <User5 />,
      },
    ],
    statusData: [
      {
        id: backlogTickets?.[0]?.status,
        name: backlogTickets?.[0]?.status,
        size: backlogTickets?.length,
        logo: <BackIcon />,
      },
      {
        id: todoTickets?.[0]?.status,
        name: todoTickets?.[0]?.status,
        size: todoTickets?.length,
        logo: <CircleIcon />,
      },
      {
        id: inprogressTickets?.[0]?.status,
        name: inprogressTickets?.[0]?.status,
        size: inprogressTickets?.length,
        logo: <ClockIcon />,
      },
      {
        id: "Done",
        name: "Done",
        size: doneTickets?.length,
        logo: <CheckCircleIcon />,
      },
      {
        id: "Cancelled",
        name: "Cancelled",
        size: cancelledTickets?.length,
        logo: <CancelIcon />,
      },
    ],
    priorityData: [
      {
        id: P0Tickets?.[0]?.priority,
        name: "No priority",
        size: P0Tickets?.length,
        logo: <NoPriorityIcon />,
      },
      {
        id: P4Tickets?.[0]?.priority,
        name: "Urgent",
        size: P4Tickets?.length,
        logo: <UrgentIcon />,
      },
      {
        id: P3Tickets?.[0]?.priority,
        name: "High",
        size: P3Tickets?.length,
        logo: <HighIcon />,
      },
      {
        id: P2Tickets?.[0]?.priority,
        name: "Medium",
        size: P2Tickets?.length,
        logo: <MediumIcon />,
      },
      {
        id: P1Tickets?.[0]?.priority,
        name: "Low",
        size: P1Tickets?.length,
        logo: <LowIcon />,
      },
    ],
  };
  return extractedData;
};

export default ExtractData;
