import React from "react";
import { Grid } from "@material-ui/core";
import { GameInfoCard } from "./GameInfoCard";
import "./App.css";

type CardInfo = {
  heading: string;
  subHeading: string;
  imgUrl: string;
  description: string;
};

export const Dashboard = () => {
  const appCards: Array<CardInfo> = [
    {
      heading: "Tetris",
      subHeading: "This is tetris",
      imgUrl: "/image1.svg",
      description: "Tetris is a game",
    },
    {
      heading: "Sudoku",
      subHeading: "This is sudoku",
      imgUrl: "/image2.svg",
      description: "Sudoku is a game",
    },
    {
      heading: "Hangman",
      subHeading: "This is hangman",
      imgUrl: "/image3.svg",
      description: "Hangman is a game",
    },
    {
      heading: "Trivia",
      subHeading: "This is trivia",
      imgUrl: "/image4.svg",
      description: "Trivia is a game",
    },
    {
      heading: "Asteroids",
      subHeading: "This is asteroids",
      imgUrl: "/image5.svg",
      description: "Asteroids is a game",
    },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "16px",
        overflowY: "scroll",
        backgroundColor: "lightgray",
      }}
    >
      <Grid container direction="row" spacing={3} justifyContent="space-evenly">
        {appCards.map((item: CardInfo) => (
          <Grid item key={item.heading}>
            <GameInfoCard
              heading={item.heading}
              subHeading={item.subHeading}
              imgUrl={item.imgUrl}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
