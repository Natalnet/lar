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
      <Route path="/lar" exact component={SignIn} />
      <Route path="/lar/registrar" component={SignUp} />

      <Route path="/lar/dashboard" component={Dashboard} isPrivate />
      <Route path="/lar/perfil" component={Profile} isPrivate />
      <Route path="/lar/inventario" component={Inventario} isPrivate />
      <Route path="/lar/emprestimos" component={Emprestimos} isPrivate />
      <Route path="/lar/cadastro" component={Cadastro} isPrivate />
    </Switch>
  );
}
