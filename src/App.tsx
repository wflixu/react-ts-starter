
import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router'

import { Route, Switch } from 'react-router'
import Home from './components/Home'
// import Hello from '../components/Hello'
import Counter from './components/Counter'
// import NoMatch from '../components/NoMatch'
import NavBar from './components/NavBar'
interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/counter" component={Counter} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

export default App;
