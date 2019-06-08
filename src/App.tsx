import * as React from 'react';

import Confirm from './components/Confirm';

interface IState {
    confirmOpen: boolean;
    confirmMessage: string;
    confirmVisible: boolean;
    countDown: number;
}

class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            confirmVisible: true,
            countDown: 10,
            confirmOpen: false,
            confirmMessage: 'please hit the confirm  button'
        }
    }
    private handleConfirmOkClick = () => {
        this.setState({
            confirmMessage: 'cool carry on reading!',
            confirmOpen: false
        });
        clearInterval(this.timer);
    }
    private handleConfirmCancelClick = () => {
        this.setState({
            confirmOpen: false,
            confirmMessage: 'take a break,i m sure you will later..'
        });
        clearInterval(this.timer);
    }
    private handleConfirmClick = () => {
        this.setState({
            confirmOpen: true,
        });
        clearInterval(this.timer);
    }

    private timer: number = 0;
    private handleTimerTick = () => {
        this.setState({
            confirmMessage: `plage hit the confirm button ${this.state.countDown} sec to go`,
            countDown: this.state.countDown - 1
        }, () => {
            if (this.state.countDown <= 0) {
                clearInterval(this.timer);
                this.setState(
                    {
                        confirmMessage: 'too late to confirm',
                        confirmVisible: false
                    }
                )
            }
        });

    }
    public componentDidMount() {
        this.timer = window.setInterval(() => {
            this.handleTimerTick();
        }, 1000);
    }
    public componentWillUnmount() {
        clearInterval(this.timer)
    }
    public render() {
        return (<div className="app">
            <p>{this.state.confirmMessage}</p>
            {this.state.confirmVisible && (<button onClick={this.handleConfirmClick}>confirm</button>)}
            {this.state.countDown>0&&     <Confirm
                open={this.state.confirmOpen}
                title="react and typescirpt"
                content={this.state.confirmMessage}
                cancelCaption="取消"
                onOkClick={this.handleConfirmOkClick}
                onCancelClick={this.handleConfirmCancelClick}
            />}
        
        </div>);
    }
}