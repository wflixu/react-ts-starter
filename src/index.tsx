import * as React from 'react';
import * as ReactDOM from 'react-dom';

// const App:React.SFC = ()=>{
//     return <h1>my react app with typescript</h1>
// }

class App extends   React.Component{
    public render(){
        return  <h1>my react app with typescript</h1>;
    }
}

ReactDOM.render(<App/>,document.getElementById('root') as HTMLElement);