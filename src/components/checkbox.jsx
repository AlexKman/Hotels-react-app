import React from "react";

const Checkbox = props => {
  return <input type="checkbox" onClick={props.onClick} id={props.id} />;
};

export default Checkbox;
