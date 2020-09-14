import React from "react";
import "./index.css";
import Board from "./Board/Board";
import { SUMMARY } from "./constants";

const DiamondSweeper = () => {
  return (
    <div className="diamond-sweeper-container">
      <h1>Diamond Sweeper</h1>
      <p>{SUMMARY}</p>
      <Board />
    </div>
  );
};

export default DiamondSweeper;
