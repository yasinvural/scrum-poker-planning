import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StoryList from "./components/StoryList/StoryList";
import MasterViewPlanning from "./components/MasterViewPlanning/MasterViewPlanning";
import Logo from "./components/Logo/Logo";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Logo />
      <Router>
        <Route exact path="/" component={StoryList} />
        <Route path="/master" component={MasterViewPlanning} />
      </Router>
    </div>
  );
}

export default App;
