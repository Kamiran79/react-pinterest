import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseApp from '../helpers/data/connection';

import MyNavbar from '../components/MyNavbar/MyNavbar';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import SingleBoard from '../components/SingleBoard/SingleBoard';

import './App.scss';

firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
    singleBoardId: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (singleBoardId) => {
    this.setState({ singleBoardId });
  }

  render() {
    const { authed, singleBoardId } = this.state;

    const loadComponent = () => {
      if (authed && singleBoardId.length === 0) {
        return <BoardContainer setSingleBoard={this.setSingleBoard}/>;
      }

      if (authed && singleBoardId.length > 0) {
        return <SingleBoard boardId={singleBoardId} setSingleBoard={this.setSingleBoard}/>;
      }

      return '';
    };

    return (
      <div className="App">
        <MyNavbar authed={authed} />
        <h2>INSIDE APP COMPONENT</h2>
        <button className="btn btn-info">
          <i className="fab fa-pinterest-p"></i> I am a button <i className="fab fa-pinterest-p"></i>
        </button>
        {loadComponent()}
      </div>
    );
  }
}

export default App;
