import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

const AdminPage = React.lazy(() => import("./pages/AdminPage"));

const Routes: React.SFC<RouteComponentProps> = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(true);

    return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key={props.location.key} timeout={500} classNames="animate"    >
                    <Switch>
                        <Redirect exact={true} from="/" to="/products" />
                        <Route exact={true} path="/products" component={ProductsPage} />
                        <Route path="/products/:id" component={ProductPage} />
                        <Route path="/admin" component={AdminPage} >
                            {loggedIn ? (
                                <Suspense fallback={<div className="pagecontainer">Loading...</div>}>
                                    <AdminPage />
                                </Suspense>) : (<Redirect to="/login" />)}
                        </Route>

                        <Route path="/login" component={LoginPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};
const RoutesWrap: React.SFC = () => {
    return (
        <Router>
            <Route component={Routes}></Route>
        </Router>
    )
}
export default RoutesWrap; 