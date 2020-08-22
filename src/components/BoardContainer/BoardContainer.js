import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';

import smash from '../../helpers/data/smash';
import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  goGetYoBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((err) => console.error('get boards broke!!', err));
  };

  deleteBoard = (boardId) => {
    smash.totallyRemoveBoard(boardId)
      .then(() => this.goGetYoBoards())
      .catch((err) => console.error('delete board faild', err));
  };

  componentDidMount() {
    this.goGetYoBoards();
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);

    return (
      <div>
        <h2>BoardContainer Here</h2>
        <div className="card-columns">
          {boardCard}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
