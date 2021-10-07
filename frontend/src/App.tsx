import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ManageView from "./pages/Manage";
import StartMenu from "./pages/Start";
import Play from "./pages/Play";

export function AppRoot() {
  return (
    <div>
      <Switch>
        <Route path="/start">
          <StartMenu />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/manage">
          <ManageView />
        </Route>
        <Route>
          <Redirect to="/start" />
        </Route>
      </Switch>
    </div>
  );
}

export default AppRoot;
