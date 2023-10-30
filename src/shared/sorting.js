export const sortTicketsByTitle = (tickets) => {
  if (!tickets) {
    return [];
  }

  return [...tickets].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
};
export const sortTicketsByPriority = (tickets) => {
  if (!tickets) {
    return [];
  }

  return [...tickets].sort((a, b) => {
    return b.priority - a.priority;
  });
};
