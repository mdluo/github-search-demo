import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { Frontload } from 'react-frontload';
import { ConnectedRouter } from 'connected-react-router';

import Routes from 'routes';

import createStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const { store, history } = createStore();

const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload noServerRender>
        <Routes />
      </Frontload>
    </ConnectedRouter>
  </Provider>
);

const root = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(Application, root);
  });
} else {
  ReactDOM.render(Application, root);
}

registerServiceWorker();
