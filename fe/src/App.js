import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddStoryList from "./components/AddStoryList/AddStoryList";
import MasterViewPlanning from "./components/MasterViewPlanning/MasterViewPlanning";
import DeveloperViewPlanning from "./components/DeveloperViewPlanning/DeveloperViewPlanning";
import Error from "./components/Error/Error";
import Logo from "./components/Logo/Logo";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Logo />
      <Router>
        <Route exact path="/" component={AddStoryList} />
        <Route path="/master/:session" component={MasterViewPlanning} />
        <Route path="/developer/:session" component={DeveloperViewPlanning} />
        <Route path="/error" component={Error} />
      </Router>
    </div>
  );
}

export default App;
