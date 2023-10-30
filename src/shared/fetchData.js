import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log("Error in fetching the Data", error);
    return null;
  }
};
export default fetchData;