import * as React from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';


const Routes: React.SFC = () => {
    const [loggedIn,setLoggedIn] = React.useState(false);

    return (<Router>
        <div>
            <Header />
            <Switch>
                
                <Redirect exact={true} from="/" to="/products"  />
                <Route exact={true} path="/products" component={ProductsPage} />
                <Route path="/products/:id" component={ProductPage} />
                <Route path="/admin" component={AdminPage} >
                    {loggedIn?<AdminPage/>:<LoginPage/>}
                </Route>
                <Route path="/login" component={LoginPage} />
                <Route component={NotFoundPage} />
            </Switch>

        </div>
    </Router>);
};
export default Routes; 