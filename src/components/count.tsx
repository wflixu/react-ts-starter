import React from 'react';

interface IState{
    count:number;
}
class Count extends React.Component<{},IState>{
    constructor(props:{}){
        super(props);
        this.state = {
            count:10,
        }
    }
    private handleClick = ()=>{
        this.setState({
            count:this.state.count+1
        })
    }
    public render (){
        return(
            <div className="count">
                <span>{this.state.count}</span>
                <button onClick={this.handleClick}>add</button>
            </div>
        )
    }
}