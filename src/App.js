import React, { Component } from "react";
import hotels from "./data/hotels.json";
import Checkbox from "./components/Checkbox.jsx";
import "./App.css";

class App extends Component {
  state = {
    hotels: [],
    facilities: []
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
        Filtering:{" "}
        {this.state.facilities.join(", ") || "showing all facilities!"}
        <ul className="hotelslist">
          {this.sortHotelInStarsOrder()
            .filter(hotel =>
              this.checkForFacilities(hotel.facilities, this.state.facilities)
            )
            .map(hotel => (
              <div id="hotel" key={hotel.id}>
                <section>{hotel.name}</section>
                <section>Star rating = {hotel.starRating}</section>
                <section>Facilities = {hotel.facilities}</section>
              </div>
            ))}
        </ul>
      </div>
    );
  }
  handleSearch = e => {
    if (!this.state.facilities.includes(e.target.id)) {
      this.setState({ facilities: [...this.state.facilities, e.target.id] });
    } else {
      const facilitiesCopy = [...this.state.facilities];
      const index = facilitiesCopy.indexOf(e.target.id);
      facilitiesCopy.splice(index, 1);
      this.setState({ facilities: facilitiesCopy });
    }
  };
  sortHotelInStarsOrder = () => {
    const hotels = this.state.hotels;
    hotels.sort((hotel1, hotel2) => {
      return this.state.starsOrder === "asc"
        ? hotel1.starRating - hotel2.starRating
        : hotel2.starRating - hotel1.starRating;
    });
    return hotels;
  };
  checkForFacilities = (itemFacilities, specifiedFacilities) => {
    for (let i = 0; i < specifiedFacilities.length; i += 1) {
      if (!itemFacilities.includes(specifiedFacilities[i])) return false;
    }
    return true;
  };
  getHotelFacilities = hotel => {
    return hotel.facilities.join(", ") || "no facilities";
  };
}

export default App;
