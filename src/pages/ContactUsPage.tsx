import * as React from 'react';

import ContactUs from '../components/ContactUs';

interface IState {
    name: string;
    email: string;
    reason: string;
    notes: string;
}

class ContactUsPage extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            email: '',
            name: '',
            notes: '',
            reason: ''
        }
    }
    private handleNameChange = (name: string) => {
        this.setState({
            name
        });
    }
    private handleEmailChange = (email: string) => {
        this.setState({ email });
    }

    private handlleReasonChange = (reason: string) => {
        this.setState({ reason });
    }
    private handleNotesChange = (notes:string) =>{
        this.setState({notes})
    }
    public render() {
        return (
            <div className="page-container">
                <h1>Contact Us</h1>
                <p> If you enter your details we will get back to you as soon as we can.</p>
                <ContactUs/>
            </div>
        )
    }
}

export default ContactUsPage;