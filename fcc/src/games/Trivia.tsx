import React, { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const Trivia = () => {
  const socket = io();

  console.log("hey");
  socket.on("working", function (x) {
    console.log(x);
  });

  useEffect(() => {
    // axios.get("/").then((res) => console.log(res));
    socket.emit("test", "hello");
  }, []);

  return <div>TRIVIA</div>;
};
