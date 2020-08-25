import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

import smash from '../../helpers/data/smash';
import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
    formOpen: false,
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

  createBoard = (newBoard) => {
    boardsData.createBoard(newBoard)
      .then(() => {
        this.goGetYoBoards();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Create Board Broke', err));
  }

  render() {
    const { boards, formOpen } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);
    /*
    const loadBoardFormButton = () => {
      if (formOpen) {
        return <i className="far fa-plus-square"></i>;
      }

      return <i class="far fa-window-close"></i>;
    };
    */
    return (
      <div>
        <button className="btn btn-warning" onClick={() => {
          this.setState({ formOpen: !formOpen });
        }}
        >{formOpen ? <i className="btn-danger far fa-window-close"></i> : <i className="far fa-plus-square"></i> }</button>
        { formOpen ? <BoardForm createBoard={this.createBoard}/> : '' }
        {/* <h2>BoardContainer Here</h2> */}
        <div className="card-columns">
          {boardCard}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
