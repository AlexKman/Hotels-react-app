import React, { Component } from "react";
import hotels from "./data/hotels.json";
import Checkbox from "./components/Checkbox.jsx";
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
        <form id="filterOptions">
          <div>
            Car Park
            <Checkbox onClick={this.handleSearch} id="car park" />
          </div>
          <div>
            Gym
            <Checkbox onClick={this.handleSearch} id="gym" />
          </div>
          <div>
            Pool
            <Checkbox onClick={this.handleSearch} id="pool" />
          </div>
        </form>
        <ul className="hotelsList">
          {this.state.hotels.map(hotel => (
            <div id="hotel" key={hotel.id}>
              <section>{hotel.name}</section>
              <section>Star rating = {hotel.starRating}</section>
              <section>Facilities =</section>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
