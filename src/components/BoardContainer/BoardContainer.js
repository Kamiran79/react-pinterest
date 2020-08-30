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
    editBoard: {},
  }

  getBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('get boards broke!!', err));
  };

  componentDidMount() {
    this.getBoards();
  }

  deleteBoard = (boardId) => {
    smash.totallyRemoveBoard(boardId)
      .then(() => this.getBoards())
      .catch((err) => console.error(err));
  }

  createBoard = (newBoard) => {
    boardsData.createBoard(newBoard)
      .then(() => {
        this.getBoards();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Create Board Broke', err));
  }

  editABoard = (boardToEdit) => {
    this.setState({ formOpen: true, editBoard: boardToEdit });
  }

  updateBoard = (boardId, editedBoard) => {
    boardsData.updateBoard(boardId, editedBoard)
      .then(() => {
        this.getBoards();
        this.setState({ formOpen: false, editBoard: {} });
      })
      .catch((err) => console.error('Update Board Borked', err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { boards, formOpen, editBoard } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard} editABoard={this.editABoard}/>);

    return (
      <div>
        <div className="mb-3">
          {!formOpen ? <button className="btn btn-warning" onClick={() => { this.setState({ formOpen: true, editBoard: {} }); }}><i className='far fa-plus-square'></i></button> : '' }
          {formOpen ? <BoardForm createBoard={this.createBoard} boardThatIAmEditing={editBoard} updateBoard={this.updateBoard} closeForm={this.closeForm}/> : ''}
        </div>
        <div className="card-columns">
          {boardCard}
        </div>
      </div>
    );
  }
}

export default BoardContainer;

/*

my old div was working had issue with edit have to change it

      <div>
        <button className="btn btn-success" onClick={() => {
          this.setState({ formOpen: !formOpen });
        }}
        >{formOpen ? <i className="btn-danger far fa-window-close"></i> : <i className="far fa-plus-square"></i> }</button>
        { formOpen ? <BoardForm createBoard={this.createBoard} boardThatIAmEditing={editBoard} updateBoard={this.updateBoard}/> : '' }
        {/* <h2>BoardContainer Here</h2> }
        <div className="card-columns">
          {boardCard}
        </div>
      </div>
*/
