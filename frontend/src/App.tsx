import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import ManageView from "./pages/Manage";
import StartMenu from "./pages/Start";
import Play from "./pages/Play";
import Practice from "./pages/Practice";

export function AppRoot() {
  return (
    <Container fluid className="bg-teal h-100 mh-100 ">
      <Switch>
        <Route path="/start">
          <StartMenu />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/practice/:gameId?">
          <Practice />
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
