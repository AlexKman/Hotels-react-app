import React, { Component } from "react";
import hotels from "./data/hotels.json";
import "./App.css";
import Checkbox from "./components/checkbox.jsx";

class App extends Component {
  state = {
    hotels: [],
    facilities: [],
    starsOrder: "asc"
  };

  componentDidMount() {
    this.setState({ hotels });
  }

  render() {
    const { hotels } = this.state;
    return (
      <div className="App">
        <header id="header">Hotels-ReactApp</header>
        <header>Sort by star rating!</header>
        <select onChange={this.handleStarsChange}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <br />
        <header>Add filters!</header>
        <form id="filteroptions">
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
        <br />
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
                <section>Facilities = {this.getHotelFacilities(hotel)}</section>
              </div>
            ))}
        </ul>
      </div>
    );
  }
  checkForFacilities = (itemFacilities, specifiedFacilities) => {
    for (let i = 0; i < specifiedFacilities.length; i += 1) {
      if (!itemFacilities.includes(specifiedFacilities[i])) return false;
    }
    return true;
  };
  getHotelFacilities = hotel => {
    return hotel.facilities.join(", ") || "no facilities";
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
  handleStarsChange = e => {
    this.setState({ starsOrder: e.target.value });
  };

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
}

export default App;
