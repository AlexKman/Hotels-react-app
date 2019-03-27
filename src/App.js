import React, { Component } from "react";
import hotels from "./data/hotels.json";
import "./App.css";

class App extends Component {
  state = {
    hotels: []
  };
  componentDidMount() {
    this.setState({ hotels });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">Hotels-react-app</header>
        <ul />
      </div>
    );
  }
}

export default App;
