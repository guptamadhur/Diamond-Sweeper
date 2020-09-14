import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";
import Modal from "../../../common/Modal";
import Notification from "../../../common/Notification";
import { randomizeBoard } from "../utils";
import { DIAMOND } from "../constants";
import "./board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    // Get localStorage state
    let historySquares = JSON.parse(localStorage.getItem("diamondSweeper"));
    let squares;
    // generating a new board, if localStorage is NULL
    if (!historySquares) {
      squares = randomizeBoard(props.BOARD_SIZE).map((item) => ({
        value: item,
        opened: false,
      }));
    } else {
      squares = historySquares[historySquares.length - 1].squares.slice();
    }
    this.state = {
      history: historySquares ? [...historySquares] : [{ squares }],
      lastClicked: null,
      notificationMessage: "",
      stepNumber: 0,
    };

    // store Diamond Indices
    this.diamondIndices = squares.reduce((acc, item, idx) => {
      if (item.value === DIAMOND) acc.push(idx);
      return acc;
    }, []);
  }

  componentDidMount() {
    this.setState({
      stepNumber: this.state.history.length - 1,
    });
  }

  // update score on square click
  updateScore = (index) => {
    //Creating a new copy of state then making changes

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // const squares = [...this.state.squares];
    squares[index] = { ...squares[index], opened: true };
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      lastClicked: index,
    });
  };

  jumpTo = (step, desc) => {
    this.setState({
      stepNumber: step,
      notificationMessage: desc,
    });
  };

  //save in local storage
  saveProgress = () => {
    localStorage.setItem(
      "diamondSweeper",
      JSON.stringify([...this.state.history])
    );

    this.setState({
      notificationMessage: "Progress saved!",
    });
  };

  clearBoard = () => {
    localStorage.removeItem("diamondSweeper");
    window.location.reload();
  };

  loadButtons = () => {
    return (
      <div className="btn-container">
        <button onClick={this.saveProgress}>SAVE</button>
        <button onClick={this.clearBoard}>RESET</button>
      </div>
    );
  };

  onModalClick = () => {
    localStorage.removeItem("diamondSweeper");
    window.location.reload();
  };

  render() {
    const { history, lastClicked } = this.state;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    let moves;
    if (history.length > 1) {
      moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move, desc)}>{desc}</button>
          </li>
        );
      });
    }

    // calculate score based on unopened
    const score = squares.filter((s) => !s.opened).length;

    //Check Status
    const isComplete =
      squares.filter((s) => s.opened && s.value === DIAMOND).length ===
      this.props.BOARD_SIZE;

    // cal the nearest hidden diamond
    const unopenedDiamondIndices = this.diamondIndices.filter(
      (idx) => !squares[idx].opened
    );

    return (
      <>
        <h4 className="score">Score: {score}</h4>
        <ul className="board">
          {squares.map((square, index) => (
            <Square
              key={index}
              boardSize={this.props.BOARD_SIZE}
              value={square.value}
              opened={square.opened}
              updateScore={this.updateScore}
              index={index}
              diamondIndices={unopenedDiamondIndices}
              lastClicked={lastClicked === index}
            />
          ))}
        </ul>

        {this.loadButtons()}
        <div className="status-info">
          <ol>{moves}</ol>
        </div>
        {isComplete && (
          <Modal
            heading="GAME OVER!"
            body={`Score: ${score} `}
            buttonClick={{
              onClick: () => this.onModalClick(),
              text: "Restart",
            }}
          />
        )}
        <Notification message={this.state.notificationMessage} />
      </>
    );
  }
}

// Specifies the default values for props:
Board.defaultProps = {
  BOARD_SIZE: 8,
};

Board.propTypes = {
  BOARD_SIZE: PropTypes.number,
};

export default Board;
