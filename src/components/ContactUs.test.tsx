import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { render, cleanup, fireEvent } from '@testing-library/react';


import ContactUs from './ContactUs';
import { ISubmitResult } from './Form';

afterEach(cleanup);
describe('ContactUs', () => {
    test('When submit without filling in fields should display errors', () => {
        const handleSubmit = jest.fn();
        const { container, getAllByText, getByText } = render(<ContactUs onSubmit={handleSubmit} />);
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
        const form = container.querySelector("form");
        expect(form).not.toBeNull();
        Simulate.submit(form!);

        const errorSpans = getAllByText("This must be populated");
        expect(errorSpans.length).toBe(2);
        expect(handleSubmit).not.toBeCalled();

        ReactDOM.unmountComponentAtNode(container);
    });
    test('When submit after filling in fields should submit okay', () => {
        const handleSubmit = jest.fn();
        const { container, getByText, getByLabelText } = render(
            <ContactUs onSubmit={handleSubmit} />
        );
        const nameField: HTMLInputElement = getByLabelText("Your name") as HTMLInputElement;
        expect(nameField).not.toBeNull();
        fireEvent.change(nameField, {
            target: {
                value: "carl"
            }
        });
        const emailField = getByLabelText("Your email address") as HTMLInputElement;
        expect(emailField).not.toBeNull();
        fireEvent.change(emailField, { target: { value: "carl.rippon@testmail.com" } });
        const submitButton = getByText("Submit");
        fireEvent.click(submitButton);

        const errorsDiv = container.querySelector("[datatestid='formErrors']");
        expect(errorsDiv).toBeNull();
        // expect(handleSubmit).toBeCalledTimes(1);
        // expect(handleSubmit).toBeCalledWith({
        //     name: "Carl",
        //     email: "carl.rippon@testmail.com",
        //     reason: "Support",
        //     notes: ""
        // });
    });

    test("Renders okay", () => {
        const handleSubmit = async (): Promise<ISubmitResult> => {
            return { success: true };
        };
        const { container } = render(<ContactUs onSubmit={handleSubmit} />);
        expect(container).toMatchSnapshot();
    });

});