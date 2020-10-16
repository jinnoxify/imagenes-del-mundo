import React, { useEffect, useState } from "react";
import "./App.css";
import UserInfo from "./Components/UserInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Invoice from "./Components/Invoice";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    let username = prompt("Ingrese su nombre");
    setUser(username);
  }, []);
  return (
    <Router>
      <Switch>
        <div className="app">
          <h1 className="app__title">IMAGENES DEL MUNDO</h1>
          <div className="app__container">
            <Route
              exact
              path="/imagenes-del-mundo"
              render={() => <UserInfo user={user} />}
            />
            <Route exact path="/invoice" component={Invoice} />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
