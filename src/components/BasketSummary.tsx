import * as React from 'react';
import {connect} from 'react-redux';


interface IProps {
    count:number;
}

const BasketSummary:React.SFC<IProps>=props=>{
    return <div className="basket-summary">{props.count}</div>
}

export default BasketSummary;