import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RebusView from "./Rebus";
import StartMenu from "./Start";

export function AppRoot() {
  return (
    <div>
      <Switch>
        <Route path="/start">
          <StartMenu />
        </Route>
        <Route path="/play">
          <RebusView />
        </Route>
        <Route>
          <Redirect to="/start" />
        </Route>
      </Switch>
    </div>
  );
}

export default AppRoot;
