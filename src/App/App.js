import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseApp from '../helpers/data/connection';

import MyNavbar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/Auth/Auth';
import BoardContainer from '../components/BoardContainer/BoardContainer';

import './App.scss';

firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
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

  render() {
    const { authed } = this.state;

    const loadComponent = () => {
      if (authed) {
        return <BoardContainer />;
      }

      return <Auth />;
    };

    return (
      <div className="App">
        <MyNavbar />
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
