import React from "react";
import ReactDOM from "react-dom";
import PlacesSearcher from "./PlacesSearcher";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PlacesSearcher />, div);
  ReactDOM.unmountComponentAtNode(div);
});
