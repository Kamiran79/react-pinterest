import React from 'react';
import PropTypes from 'prop-types';

import pinsData from '../../helpers/data/pinsData';
import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    pinsLength: 0,
  }

  singleBoardEvent = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  componentDidMount() {
    const { board } = this.props;
    pinsData.getPinsByBoardId(board.id)
      .then((res) => {
        const pinsLength = res.length;
        this.setState({ pinsLength });
      })
      .catch((err) => console.warn('broke to get pins length', err));
  }

  render() {
    const { pinsLength } = this.state;
    const { board } = this.props;
    return (
      <div className="card text-center">
        <div className="card-header"><h5>{board.boardTitle}</h5></div>
        <div className="card-body">
          { /* <p className="card-title">{board.description}</p> */ }
          <p className="card-text">
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
          </p>
          <button className="btn btn-secondary" onClick={this.singleBoardEvent}>View Board Details</button>
        </div>
    <div className="card-footer text-muted">Pins: {pinsLength}</div>
      </div>
    );
  }
}

export default Board;
