import { Switch, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { gqlClient } from './config';
import { AuthProvider } from './Contexts/Auth';
import { ToastProvider } from './Contexts/Toast';

import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import CMS from './Pages/CMS';
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/cms">
        <ApolloProvider client={gqlClient}>
          <AuthProvider>
            <ToastProvider>
              <CMS />
            </ToastProvider>
          </AuthProvider>
        </ApolloProvider>
      </Route>
      <Route path="/not-found">
        <NotFound />
      </Route>
      <Route path="*">
        <Redirect to="/not-found" />
      </Route>
    </Switch>
  );
}

export default App;
