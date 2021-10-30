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
import {TriviaTimer} from './TriviaTimer';
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
  question: string,
  answers: []
}

const randName = () =>
{
  return (Math.random() + 1).toString(36).substring(7).toUpperCase();
}


export const Trivia = () => {
  
  const socket = useMemo(() => openSocket("http://localhost:9000"), []);
  const parser = new DOMParser();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any>();
  const [question, setQuestion] = useState<Question>();
  const [category, setCategory] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>();
  const [localPlayer, setLocalPlayer] = useState<Player>(
    {
      name: randName(),
      score: 0
    }
  )
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    players: [
      {
        name: "Artimus",
        score: 0,
      },
    ],
  });

  const setCurrentGameState = (res: any) =>
  {
    console.log('setGame');
    console.log(res);
    // setCategory(res['category']);
    // setQuestion({
    //     question: res['question'],
    //     answers: res['answers']
    //   });
    setIsLoading(false); 
  }
  socket.on("setGame", (res :any) => {
    console.log("setting game")
    setCurrentGameState(res);
  })
  socket.on("playerGuess", (res) => console.log(res));
  // let socket =
  useEffect(()=>{
    console.log(socket)
    
    socket.emit("getGame", localPlayer.name);

    
  },[])
  


  const sanitizedText = (question: string) =>
  {
    return parser.parseFromString(`<!doctype html><body>${question}`, "text/html").body
    .textContent;
  }

  useEffect(() => {
    
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res: any) => {
        // console.log('res', res);
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
      })
  }, []);

  useEffect(() => {
    socket.emit("answer", selectedAnswer?.answer.correct);
  }, [selectedAnswer]);

  if (isLoading)
  {
    return (
      <div>
        Loading...
      </div>
    )
  }
  else
  {
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
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          <TriviaTimer
            endTime="samds"
          />
          <Typography variant="h3">{category}</Typography>
          sdnasdndnsndasdsa
        </Box>
        <Card style={{ width: "75%" }}>
          <CardHeader title={`Question ${gameState.currentQuestion + 1}`} />
          <CardContent>
            <Typography variant="h5">
              {/* {question?.question} */}
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
  }

};
