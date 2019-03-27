import { mount } from "enzyme";
import React from "react";
import Checkbox from "./checkbox";

describe("checkbox", () => {
  let component;
  let mockFn;
  let id;
  beforeEach(() => {
    mockFn = jest.fn();
    id = "123";
    component = mount(<Checkbox id={id} onClick={mockFn} />);
  });
  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
  });
  it("executes onClick handler on click", () => {
    component.find("input").simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  it("has id as given by the prop", () => {
    expect(component.find({ id }).exists()).toEqual(true);
  });
});
