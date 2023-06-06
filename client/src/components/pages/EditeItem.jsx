import axios from "../store/axios";
import React, { useEffect } from "react";

const EditeItem = () => {
  const items = JSON.parse(localStorage.getItem("user"));
  const fetchAllUser = async () => {
    const response = await axios(`/api/users/all`, {
      method: "GET",
      data: { items },
    });
    console.log(response.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  return <div>EditeItem</div>;
};

export default EditeItem;
