import SearchUser from "./components/SearchUser";
import Banner from "./components/SFBanner";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import ValidateAccount from "./components/ValidateAccount";
function App() {
  return (
    <Router>
      <Link to="/deladmin/pages/searchAccounts" />
      <Link to="/deladmin/pages/validateAccount" />
      <Switch>
        <Route path="/deladmin/pages/searchAccounts">
          <Banner />
          <SearchUser />
        </Route>
        <Route path="/deladmin/pages/validateAccount">
          <Banner />
          <ValidateAccount />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
