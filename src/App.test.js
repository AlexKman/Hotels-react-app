import { mount } from "enzyme";
import React from "react";
import App from "./App";
import hotels from "./data/hotels.json";

describe("checkbox", () => {
  let component;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    component = mount(<App />);
  });
  describe("Component", () => {
    it("renders correctly", () => {
      expect(component).toMatchSnapshot();
    });
    it("has a select box with two options", () => {
      expect(component.find("select")).toHaveLength(1);
    });
    it("has a select box with two options", () => {
      expect(component.find("option")).toHaveLength(2);
    });
    it("has three CheckBox's", () => {
      expect(component.find("Checkbox")).toHaveLength(3);
    });
  });
});
describe("Behaviour", () => {
  describe("componentDidMount", () => {
    it("loads hotels to state on mounting", () => {
      const instance = component.instance();
      instance.componentDidMount();
      expect(instance.state.hotels).toEqual(hotels);
    });
  });
});
describe("handleSearch", () => {
  let instance;
  let facilities;
  beforeEach(() => {
    instance = component.instance();
    facilities = ["car", "pool", "gym"];
    instance.setState({ facilities });
  });
  it("adds to facilities array if id is not found", () => {
    const event = {
      target: {
        id: "big"
      }
    };
    instance.handleSearch(event);
    expect(instance.state.facilities.length).toEqual(4);
    expect(instance.state.facilities.includes("big")).toEqual(true);
  });
  it("removes from facilities array if id is found", () => {
    const event = {
      target: {
        id: "car"
      }
    };
    instance.handleSearch(event);
    expect(instance.state.facilities.length).toEqual(2);
    expect(instance.state.facilities.includes("car")).toEqual(false);
  });
});
describe("handleStarsChange", () => {
  it("changes the starsOrder state", () => {
    const instance = component.instance();
    const event = {
      target: {
        value: "asc"
      }
    };
    instance.setState({ starsOrder: "desc" });
    instance.handleStarsChange(event);
    expect(instance.state.starsOrder).toEqual("asc");
  });
});
describe("sortHotelInStarsOrder", () => {
  let instance;
  beforeEach(() => {
    instance = component.instance();
  });
  it("sorts the hotel in the ascending order of stars when starsOrder is asc", () => {
    const hotels = [
      {
        name: "Landmark",
        starRating: 3,
        facilities: ["car park", "gym"],
        id: 2
      },
      {
        name: "Billay",
        starRating: 1,
        facilities: ["pool"],
        id: 3
      }
    ];
    instance.setState({ hotels });
    const hotelsSortedAscending = [
      {
        name: "Billay",
        starRating: 1,
        facilities: ["pool"],
        id: 3
      },
      {
        name: "Landmark",
        starRating: 3,
        facilities: ["car park", "gym"],
        id: 2
      }
    ];
    expect(instance.sortHotelInStarsOrder()).toEqual(hotelsSortedAscending);
  });
  it("sorts the hotel in the descending order of stars when starsOrder is desc", () => {
    const hotels = [
      {
        name: "Billay",
        starRating: 1,
        facilities: ["pool"],
        id: 3
      },
      {
        name: "Landmark",
        starRating: 3,
        facilities: ["car park", "gym"],
        id: 2
      }
    ];
    instance.setState({ hotels });
    instance.setState({ starsOrder: "desc" });
    const hotelsSortedDescending = [
      {
        name: "Landmark",
        starRating: 3,
        facilities: ["car park", "gym"],
        id: 2
      },
      {
        name: "Billay",
        starRating: 1,
        facilities: ["pool"],
        id: 3
      }
    ];
    expect(instance.sortHotelInStarsOrder()).toEqual(hotelsSortedDescending);
  });
});
