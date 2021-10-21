import { Switch, Route, useLocation } from "react-router-dom";
import Inicio from "../Inicio";
import Cadastro from "../SingUp";
import Login from "../Login";
import Dashboard from "../Dashboard";
import { useState } from "react";
import { useEffect } from "react";
const Rotes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));
    if (token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);
  return (
    <Switch>
      <Route exact path="/">
        <Inicio authenticated={authenticated} />
      </Route>
      <Route path="/singup">
        <Cadastro authenticated={authenticated} />
      </Route>
      <Route path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard authenticated={authenticated} />
      </Route>
    </Switch>
  );
};
export default Rotes;
