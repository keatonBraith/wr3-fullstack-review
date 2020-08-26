import React from "react";
import "./App.css";
import "./reset.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/front_page" component={FrontPage} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
