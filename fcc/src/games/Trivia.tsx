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

export const Trivia = () => {
  const socket = useMemo(() => openSocket("http://localhost:9000"), []);
  const parser = new DOMParser();

  const [questions, setQuestions] = useState<any>();
  const [category, setCategory] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>();
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    players: [
      {
        name: "Artimus",
        score: 0,
      },
    ],
  });

  socket.on("playerGuess", (res) => console.log(res));
  const sanitizedText = (question: string) =>
    parser.parseFromString(`<!doctype html><body>${question}`, "text/html").body
      .textContent;

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res: any) => {
        console.log(res);
        setCategory(res.data.results[0].category);
        setQuestions(
          res.data.results.map((q: any) => {
            return {
              question: sanitizedText(q.question),
              answers: [
                ...q.incorrect_answers.map((ans: string) => ({
                  answer: sanitizedText(ans),
                  correct: false,
                })),
                { answer: sanitizedText(q.correct_answer), correct: true },
              ],
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    socket.emit("answer", selectedAnswer?.answer.correct);
  }, [selectedAnswer]);

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
      <Typography variant="h3">{category}</Typography>
      <Card style={{ width: "75%" }}>
        <CardHeader title={`Question ${gameState.currentQuestion + 1}`} />
        <CardContent>
          <Typography variant="h5">
            {questions ? questions[gameState.currentQuestion]?.question : ""}
          </Typography>
        </CardContent>
      </Card>
      <Grid container>
        {questions
          ? questions[gameState.currentQuestion]?.answers?.map(
              (a: any, index: number) => (
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
                      setSelectedAnswer({ answer: a, index: index })
                    }
                  >
                    <Typography variant="h6">{a?.answer}</Typography>
                  </Button>
                </Grid>
              )
            )
          : null}
      </Grid>
    </Box>
  );
};
