import React from "react";

import { DIAMOND, QUESTION } from "../../constants";
import diamond from "../../../../../assets/diamond.png";
import arrow from "../../../../../assets/arrow.png";
import question from "../../../../../assets/question.png";
import "./index.css";

const getDirection = (diamondIndices, index, size) => {
  var nearestIndex = diamondIndices.find(
    (item) => Math.floor(item / size) === Math.floor(index / size)
  );
  var isSquareAbove = diamondIndices.find(
    (item) => Math.floor(item / size) < Math.floor(index / size)
  );
  if (nearestIndex > -1) {
    return nearestIndex > index ? "right" : "left";
  } else if (isSquareAbove) {
    return "top";
  } else {
    return "bottom";
  }
};

const getImgURL = (value, lastClicked) => {
  switch (value) {
    case DIAMOND:
      return diamond;

    case QUESTION:
      return question;

    default:
      if (lastClicked) {
        return arrow;
      }
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
  }
};

const Square = (props) => {
  const {
    value,
    index,
    updateScore,
    diamondIndices,
    lastClicked,
    opened,
    boardSize,
  } = props;
  const direction = getDirection(diamondIndices, index, boardSize);
  return (
    <li
      onClick={(e) => {
        if (opened) {
          return;
        }
        updateScore(index);
      }}
      className={opened ? "flip-square open" : "flip-square"}
    >
      <div className="swap-holder">
        {!opened || QUESTION === DIAMOND ? (
          <img alt={QUESTION} className="swap" src={getImgURL(QUESTION)} />
        ) : (
          <img
            alt={value}
            className={
              lastClicked && value !== DIAMOND ? `${direction} back` : "back"
            }
            src={getImgURL(value, lastClicked)}
          />
        )}
      </div>
    </li>
  );
};

export default Square;
