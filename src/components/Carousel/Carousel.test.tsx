import React from "react";
import ReactDOM from "react-dom";
import Carousel from "./Carousel";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Carousel />, div);
  ReactDOM.unmountComponentAtNode(div);
});
