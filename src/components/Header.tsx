import * as React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import BasketSummary from './BasketSummary';

import {IApplicationState} from './../Store';

interface IProps extends RouteComponentProps {
    basketCount:number;
}
 

const mapStateToProps = (store:IApplicationState)=>{
    return{
        basketCount:store.basket.products.length
    }
}

interface IState {
    search:string;
}

class Header extends React.Component<IProps,IState> {
    constructor(props:IProps){
        super(props);
        this.state = {
            search:''
        }
    }
    // const [search, setSearch] = React.useState('');
    // React.useEffect(() => {
    //     const searchParams = new URLSearchParams(props.location.search);
    //     setSearch(searchParams.get("search") || "");
    // }, []);

    private  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search:e.currentTarget.value
        })
    };

    private handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { this.props.history.push(`/products?search=${this.state.search}`); }
    };
    public render(){
        return (
            <header className="header">
                <div className="search-container">
                    <input type="search" placeholder="search"
                        value={this.state.search} onChange={e=>this.handleSearchChange(e)}
                        onKeyDown={e=>this.handleSearchKeydown(e)} />
                        <BasketSummary count={this.props.basketCount}/>
                </div>
                <h1 className="header-title">React Shop</h1>
                <nav>
                    <NavLink to="/products" className="header-link" activeClassName="header-link-active">Products</NavLink>
                    <NavLink to="/admin" className="header-link" activeClassName="header-link-active">Admin</NavLink>
                    <NavLink to="/contactus" className="header-link" activeClassName="header-link-active">Contact Us</NavLink>
                </nav>
            </header>
        )
    }
    
}


export default connect(mapStateToProps)(withRouter(Header));