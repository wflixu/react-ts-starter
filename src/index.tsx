import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore, { history } from './configureStore';

const store = configureStore({
  count: 0,
});

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });
}
