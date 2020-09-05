import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StoryList from "./components/StoryList/StoryList";
import Logo from "./components/Logo/Logo";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Logo />
      <Router>
        <Route exact path="/" component={StoryList} />
      </Router>
    </div>
  );
}

export default App;
