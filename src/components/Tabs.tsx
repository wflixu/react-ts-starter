import * as React from 'react';
import { log } from 'util';


interface ITabProps {
    name: string;
    initialActive?: boolean;
    heading: () => string | JSX.Element;
}
interface IState {
    activeName: string;
    activeContent: React.ReactNode;
}

interface ITabsContext {
    activeName?: string;
    handleTabClick?: (name: string,content:React.ReactNode) => void
}
const TabsContext = React.createContext<ITabsContext>({});
class Tabs extends React.Component<{}, IState>{
    public static Tab: React.SFC<ITabProps> = props => {
        return (
            <TabsContext.Consumer> 
            {(context: ITabsContext) => {
                   if (!context.activeName && props.initialActive) {
                      
                        if (context.handleTabClick) {
                            context.handleTabClick(props.name, props.children);
                            return null;
                        }
                    }
                    const activeName = context.activeName ? context.activeName : props.initialActive ? props.name : "";
                    const handleTabClick = (e:React.MouseEvent<HTMLElement>)=>{
                        if(context.handleTabClick){
                            context.handleTabClick(props.name,props.children);
                        }
                    };
                 
                    return  (<li onClick={handleTabClick}
                        className={props.name === activeName ? "active" : ""}  >
                        {props.heading()}</li>) ;
                }}
            </TabsContext.Consumer>);
    }

 
    public constructor(props: {}) {
        super(props);
        this.state = {
            activeName: '',
            activeContent: null
        };
    }
    public render() {
        return (
            <TabsContext.Provider
                value={{
                    activeName: this.state ? this.state.activeName : '',
                    handleTabClick: this.handleTabClick
                }}>

                <ul className="tabs">
                    {this.props.children}
                </ul>
                <div>{this.state && this.state.activeContent}</div> 
            </TabsContext.Provider>);
    }

    private handleTabClick = (name: string,content:React.ReactNode) => {
        
        this.setState({
            activeName: name,
            activeContent: content,
        })
    }
}

export default Tabs;
