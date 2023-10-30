export const trimTitle = (title) => {
  const words = title.split(" ");

  if (words.length > 6) {
    return words.slice(0, 6).join(" ") + "...";
  }

  return title;
};
