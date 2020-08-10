import React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>INSIDE APP COMPONENT</h2>
        <button className="btn btn-info">
          <i className="fab fa-pinterest-p"></i> I am a button <i className="fab fa-pinterest-p"></i>
        </button>
      </div>
    );
  }
}

export default App;
