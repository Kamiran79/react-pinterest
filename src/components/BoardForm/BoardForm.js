import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
// import './BoardForm.scss';

class BoardForm extends React.Component {
  static propTypes = {
    createBoard: PropTypes.func.isRequired,
  }

  state = {
    boardTitle: '',
    description: '',
    faClassName: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ boardTitle: e.target.value });
  }

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  changeFaClassNameEvent = (e) => {
    e.preventDefault();
    this.setState({ faClassName: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const { boardTitle, description, faClassName } = this.state;
    const { createBoard } = this.props;

    console.warn(description, faClassName);

    const newBoard = {
      boardTitle,
      uid: authData.getUid(),
    };

    createBoard(newBoard);
  }

  render() {
    return (
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            className="form-control"
            id="boardName"
            placeholder="Enter Board Name"
            onChange={this.changeNameEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardDescription">Board Description</label>
          <input
            type="text"
            className="form-control"
            id="boardDescription"
            placeholder="A cool thing about this board"
            onChange={this.changeDescriptionEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardFaClassName">Fontawesome ClassName</label>
          <input
            type="text"
            className="form-control"
            id="boardFaClassName"
            placeholder="Enter FontAwesome ClassName"
            onChange={this.changeFaClassNameEvent}
          />
        </div>
        <button className="btn btn-dark" onClick={this.saveBoardEvent}>Save Board</button>
      </form>
    );
  }
}

export default BoardForm;
