import * as React from 'react';

import Form from './Form';

interface IProps {
    name: string;
    onNameChange: (name: string) => void;
    email: string;
    onEmailChange: (email: string) => void;
    reason: string;
    onReasonChange: (reason: string) => void;
    notes: string;
    onNotesChange: (notes: string) => void;
}

const ContactUs: React.SFC = () => {

    return (
        <Form defaultValues={{ name: '', email: '', reason: 'Support', notes: '' }}>
            <Form.Field name="name" label="Your name" />
            <Form.Field name="emial" label="Your email addres " type="Email" />
            <Form.Field name="reason" label="Reason you need to contact us" type="Select"
                options={["Marketing", "Support", "Feedback", "Jobs", "Other"]}
            />
            <Form.Field name="notes" label="Additional notes" type="TextArea" />
        </Form>
    );
}

export default ContactUs;