import React, { useEffect, useState } from "react";
import axios from "axios";

const Result = () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/data/ocr-result`, {
          withCredentials: true,
        });
        setData(response.data.text);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);
  if(loading)
  {
    return <div>Loading...</div>;
  }
  return <div>{data}</div>;
};

export default Result;
