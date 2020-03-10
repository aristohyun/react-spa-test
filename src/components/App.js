import React from 'react';
import { Route } from "react-router-dom"
import mainPage from "./mainPage"
import canvasPage from "./canvasPage3"
import resultPage from "./resultPage"

export default function App () {
  return (
    <div>
      <Route exact path="/" component={mainPage}/>
      <Route path="/canvasPage" component={canvasPage}/>
      <Route path="/resultPage" component={resultPage}/>
   </div>
  );
}
