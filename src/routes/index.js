import React from "react";

import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp";

import Dashboard from "~/pages/Dashboard";
import Profile from "~/pages/Profile";
import Inventario from "~/pages/Inventario";
import Emprestimos from "~/pages/Empretimos";
import Cadastro from "~/pages/cadastro";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/registrar" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/perfil" component={Profile} isPrivate />
      <Route path="/inventario" component={Inventario} isPrivate />
      <Route path="/emprestimos" component={Emprestimos} isPrivate />
      <Route path="/cadastro" component={Cadastro} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
