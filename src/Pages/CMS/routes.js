import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { UserList, UserView, UserEdit, UserAdd } from "./User";
import Dashboard from "./Dashboard";
import NotFound from "../NotFound";

const Routes = () => {
  const { url } = useRouteMatch();
  
  return(
    <Switch>
      <Route exact path={url}>
        <Dashboard />
      </Route>
      <Route path={`${url}/users`}>
        <UserList />
      </Route>
      <Route path={`${url}/user/:id`}>
        <UserView />
      </Route>
      <Route path={`${url}/add-user`}>
        <UserAdd />
      </Route>
      <Route path={`${url}/edit-user/:id`}>
        <UserEdit />
      </Route>
      <Route path={`${url}/not-found`}>
        <NotFound />
      </Route>
      <Route path="*">
        <Redirect to={`${url}/not-found`} />
      </Route>
    </Switch>
  );
}

export default Routes;
