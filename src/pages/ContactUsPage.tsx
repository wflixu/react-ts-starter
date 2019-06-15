import * as React from 'react';

import ContactUs from '../components/ContactUs';
import { IValues, ISubmitResult } from '../components/Form';

interface IState {
    name: string;
    email: string;
    reason: string;
    notes: string;
}

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

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
    private handleNotesChange = (notes: string) => {
        this.setState({ notes })
    }


    private handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
        await wait(1000); // simulate asynchronous web API call
        return {
            // errors: {
            //     email: ["Some is wrong with this"]
            // },
            // success: false
            success:true
        };
    };
    public render() {
        return (
            <div className="page-container">
                <h1>Contact Us</h1>
                <p> If you enter your details we will get back to you as soon as we can.</p>
                <ContactUs onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default ContactUsPage;