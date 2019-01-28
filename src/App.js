import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from './context';
import IndexPage from './components/IndexPage';
import SingleAircraftPage from './components/SingleAircraftPage';

const App = () => (
  <Provider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/aircraft/:id" component={SingleAircraftPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;