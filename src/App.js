import React, { Component } from "react";
import hotels from "./data/hotels.json";
import Checkbox from "./components/checkbox.jsx";
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
