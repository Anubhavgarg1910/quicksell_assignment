import fetchData from "../shared/fetchData";
import { useState, useEffect } from "react";

export const useData = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData().then((fetchedData) => {
      if (fetchedData) {
        setData(fetchedData);
      }
    });
  }, []);

  return data;
};
