import React, { useEffect } from "react";
import axios from "axios";

export const Trivia = () => {
  useEffect(() => {
    axios.get("/").then((res) => console.log(res));
  });

  return <div>Trivia</div>;
};
