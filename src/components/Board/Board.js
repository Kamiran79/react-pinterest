import React from 'react';
import PropTypes from 'prop-types';

import pinsData from '../../helpers/data/pinsData';
import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    editAboard: PropTypes.func.isRequired,
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

  deleteBoardEvent = (e) => {
    e.preventDefault();
    const { board, deleteBoard } = this.props;
    deleteBoard(board.id);
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { board, editABoard } = this.props;
    editABoard(board);
  }

  render() {
    const { pinsLength } = this.state;
    const { board } = this.props;
    return (
      <div className="card text-center">
        <div className="card-header"><h5>{board.name}</h5></div>
        <div className="card-body">
          <p className="card-title">{board.description}</p>
          <p className="card-text">
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
            <i className={board.faClassName}></i>
          </p>
          <button className="btn btn-secondary mr-1" onClick={this.singleBoardEvent}><i className="fas fa-eye"></i></button>
          <button className="btn btn-warning" onClick={this.editBoardEvent}><i className="far fa-edit"></i></button>
          <br/>
          <button className="btn btn-danger mt-1" onClick={this.deleteBoardEvent}>Delete Board</button>
        </div>
    <div className="card-footer text-muted">Pins: {pinsLength}</div>
      </div>
    );
  }
}

export default Board;
