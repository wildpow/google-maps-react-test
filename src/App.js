import React, { Component } from 'react';
import './main.css';
import MyMap from './MyMap';
class App extends Component {
  render() {
    return (
      <div>
        <h1 className="title">google-maps-react test project</h1>
        <MyMap />
      </div>
    );
  }
}

export default App;
