import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

import openSocket from "socket.io-client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { TriviaTimer } from "./TriviaTimer";
import { SportsHockeyRounded } from "@material-ui/icons";
// const openSocket = require('socket.io-client');
// const socket = openSocket("http://localhost:9000");

type SelectedAnswer = {
  index: number;
  answer: {
    answer: string;
    correct: boolean;
  };
};

type GameState = {
  currentQuestion: number;
  players: Player[];
};

type Player = {
  name: string;
  score: number;
};

type Question = {
  question: string;
  answers: [];
};

const randName = () => {
  return (Math.random() + 1).toString(36).substring(7).toUpperCase();
};

export const Trivia = () => {
  const [socket, setSocket] = useState<any>();
  const parser = new DOMParser();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<Question>();
  const [category, setCategory] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>();
  const [localPlayer, setLocalPlayer] = useState<Player>({
    name: randName(),
    score: 0,
  });
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    players: [
      {
        name: "Artimus",
        score: 0,
      },
    ],
  });

  useEffect(() => {
    console.log("Initialise socket");
    setSocket(openSocket("http://localhost:9000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      socket.emit("getGame", localPlayer.name);
    });

    socket.on("setGame", (res: any) => {
      console.log("setting game: ", res.category);
      setCurrentGameState(res);
    });

    socket.on("playerGuess", (res: any) => console.log(res));
  }, [socket, localPlayer.name]);

  const setCurrentGameState = (res: any) => {
    setCategory(res.category);
    setQuestion({
      question: res.question,
      answers: res.answers,
    });
    setIsLoading(false);
  };

  console.log(question);

  const sanitizedText = (question: string) => {
    return parser.parseFromString(
      `<!doctype html><body>${question}`,
      "text/html"
    ).body.textContent;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="100vh"
        bgcolor="#78C0E0"
        padding="32px"
        boxSizing="border-box"
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <TriviaTimer endTime="samds" />
          <Typography variant="h3">{category}</Typography>
        </Box>
        <Card style={{ width: "75%" }}>
          <CardHeader title={`Question ${gameState.currentQuestion + 1}`} />
          <CardContent>
            <Typography variant="h5">
              {question ? sanitizedText(question.question) : ""}
            </Typography>
          </CardContent>
        </Card>
        <Grid container>
          {question
            ? question.answers.map((answer: any, index: number) => (
                <Grid item sm={6} style={{ padding: "8px" }} key={index}>
                  <Button
                    variant="contained"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "12px",
                      background:
                        selectedAnswer?.index === index ? "green" : "",
                    }}
                    onClick={() =>
                      setSelectedAnswer({ answer: answer, index: index })
                    }
                  >
                    <Typography variant="h6">{answer}</Typography>
                  </Button>
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
    );
  }
};
