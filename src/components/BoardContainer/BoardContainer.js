import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';

import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
  }

  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((err) => console.error('get boards broke!!', err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;

    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard}/>);

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
