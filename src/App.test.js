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
