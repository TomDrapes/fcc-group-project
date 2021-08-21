import React from 'react';
import './App.css';
import { Asteroids } from './games/Asteroids';
import { Hangman } from './games/Hangman';
import { Sudoku } from './games/Sudoku';
import { Trivia } from './games/Trivia';
import { Tetris } from './games/Tetris';
import { Dashboard } from './Dashboard';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/tetris">
          <Tetris />
        </Route>
        <Route path="/asteroids">
          <Asteroids />
        </Route>
        <Route path="/hangman">
          <Hangman />
        </Route>
        <Route path="/sudoku">
          <Sudoku />
        </Route>
        <Route path="/trivia">
          <Trivia />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
