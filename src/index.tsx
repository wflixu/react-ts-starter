import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore from "./Store";
import { IApplicationState } from "./Store";



import 'url-search-params-polyfill';



import './index.css';

const store = configureStore();

interface IProps { store: Store<IApplicationState>; }
const Root: React.SFC<IProps> = props => {
    return (
        <Provider store={props.store}>
            <Routes />
        </Provider>
    );
};



ReactDOM.render(<Root store={store} />,
    document.getElementById('root') as HTMLElement);