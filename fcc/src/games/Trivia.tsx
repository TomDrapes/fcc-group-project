import React, { useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

export const Trivia = () => {
  const socket = openSocket("http://localhost:9000");

  useEffect(() => {
    // axios.get("/").then((res) => console.log(res));
    socket.emit("test", "hello");
  }, []);

  return <div>Trivia</div>;
};
