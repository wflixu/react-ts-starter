import * as React from 'react';

import './Confirm.css';

interface IProps {
    open: boolean;
    title: string;
    content: string;
    cancelCaption?: string;
    okCaption?: string;
    onOkClick: () => void;
    onCancelClick: () => void;
}



const Confirm: React.SFC<IProps> = (props: IProps) => {

    console.log('confirm rendering!');
    
    const [cancelClickCount,setCancelClickCount] = React.useState(0);
    React.useEffect(()=>{
        console.log('CONFIRM first rendering!');
        return ()=>{
            console.log('confir unmount');
            
        }
    },[])

    const handleOkClick = () => {
        props.onOkClick();
    }
    const handleCancelClick = () => {
        const newCount = cancelClickCount +1;
        setCancelClickCount(newCount);
        if(newCount>=2){
            props.onCancelClick();
        }
    }
    return (
        <div className={props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper"}>
            <div className="confirm-container">
                <div className="confirm-title-container">
                    <span>{props.title}</span>
                </div>
                <div className="confirm-content-container">
                    <p> {props.content} </p>
                </div>
                <div className="confirm-buttonsd-container">
                    <button className="confirm-cancel" onClick={handleCancelClick}>
                        {cancelClickCount===0 ? props.cancelCaption : "really"}
                    </button>
                    <button className="confirm-ok" onClick={handleOkClick}>{
                        props.okCaption ? props.okCaption : 'okey'
                    }</button>
                </div>
            </div>
        </div>
    )
}
Confirm.defaultProps = {
    cancelCaption: 'Cancel',
    okCaption: 'Okey'
}

const ConrfirmMemo  = React.memo(Confirm);


export default ConrfirmMemo;