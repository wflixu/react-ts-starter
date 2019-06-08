import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './Routes';
import 'url-search-params-polyfill';



import './index.css';



ReactDOM.render(<Routes />, document.getElementById('root') as HTMLElement);