//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faHandBackFist,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckSquare, faCoffee, faHandBackFist);

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
