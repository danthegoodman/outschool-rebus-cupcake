import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import ManageView from "./pages/Manage";
import StartMenu from "./pages/Start";
import Play from "./pages/Play";

export function AppRoot() {
  return (
    <Container fluid className="bg-teal h-100 mh-100 ">
      <Switch>
        <Route path="/start">
          <StartMenu />
        </Route>
        <Route path="/play/:gameId?">
          <Play />
        </Route>
        <Route path="/manage">
          <ManageView />
        </Route>
        <Route>
          <Redirect to="/start" />
        </Route>
      </Switch>
    </Container>
  );
}

export default AppRoot;
