import * as React from 'react';

export interface IValues {
    [key: string]: any;
}


export type Validator = (
    fieldName: string,
    values: IValues,
    args?: any
) => string;

export const required: Validator = (
    fieldName: string,
    values: IValues,
    args?: any
): string =>
    values[fieldName] === undefined
        || values[fieldName] === null
        || values[fieldName] === ""
        ? "This must be populated" : "";

export const minLength: Validator = (
    fieldName: string,
    values: IValues,
    length: number
): string =>
    values[fieldName] && values[fieldName].length < length
        ? `This must be at least ${length} characters` : "";

export interface ISubmitResult {
    success: boolean;
    errors?: IErrors;
}

interface IValidation {
    validator: Validator;
    arg?: any;
}
interface IValidationProp {
    [key: string]: IValidation | IValidation[];
}
interface IFormProps {
    onSubmit: (valus: IValues) => Promise<ISubmitResult>
    defaultValues: IValues;
    validationRules: IValidationProp
};
interface IFieldProps {
    name: string;
    label: string;
    type?: 'Text' | 'Email' | 'Select' | 'Select' | 'TextArea';
    options?: string[];
}

interface IErrors {
    [key: string]: string[];
}

interface IFormContext {
    values: IValues;
    errors: IErrors;
    setValue?: (fieldName: string, value: any) => void;
    validate?: (fieldName: string, value: any) => void;
}


interface IState {
    values: IValues;
    errors: IErrors;
    submitted: boolean;
    submitting: boolean;
};


const FormContext = React.createContext<IFormContext>({
    values: {},
    errors: {}
});

export class Form extends React.Component<IFormProps, IState>{
    public static Field: React.SFC<IFieldProps> = props => {
        const { name, label, type, options } = props;

        const handleChange = (
            e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
                | React.ChangeEvent<HTMLSelectElement>,
            context: IFormContext
        ) => {
            if (context.setValue) {
                context.setValue(props.name, e.currentTarget.value)
            }
        }


        const handleBlur = (
            e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
                | React.ChangeEvent<HTMLSelectElement>,
            context: IFormContext
        ) => {
            if (context.validate) {
                context.validate(props.name, e.currentTarget.value);
            }
        }



        return (
            <FormContext.Consumer>
                {
                    context => (
                        <div className="form-group">
                            <label htmlFor="name">{label}</label>
                            {(type === 'Text' || type === 'Email') && (
                                <input type={type.toLowerCase()} id={name} value={context.values[name]}
                                    onChange={e => handleChange(e, context)}
                                    onBlur={e => handleBlur(e, context)}
                                />
                            )}
                            {(type === 'TextArea') && (
                                <textarea id={name} value={context.values[name]}
                                    onChange={e => handleChange(e, context)}
                                    onBlur={e => handleBlur(e, context)}
                                />
                            )}
                            {(type === 'Select') && (
                                <select value={context.values[name]}
                                    onChange={e => handleChange(e, context)}
                                    onBlur={e => handleBlur(e, context)}
                                >
                                    {
                                        options && options.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))
                                    }
                                </select>
                            )}
                            {
                                context.errors[name] &&
                                context.errors[name].length > 0 && (
                                    <div data-testid="formErrors">
                                       { context.errors[name].map(error => (
                                    <span key={error} className="form-error">
                                            {error}
                                        </span>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    )
                }

            </FormContext.Consumer>
        );
    }

    constructor(props: IFormProps) {
        super(props);
        const errors: IErrors = {};
        Object.keys(props.defaultValues).forEach(fieldName => {
            errors[fieldName] = [];
        });
        this.state = {
            submitted: false,
            submitting: false,
            errors,
            values: props.defaultValues
        }
    }

    private setValue = (fieldName: string, value: any) => {
        const newValues = {
            ...this.state.values,
            [fieldName]: value
        };
        this.setState({ values: newValues });
    }
    private validate = (fieldName: string, value: any): string[] => {
        const rules = this.props.validationRules[fieldName];
        const errors: string[] = [];

        if (Array.isArray(rules)) {
            rules.forEach(rule => {
                const error = rule.validator(
                    fieldName,
                    this.state.values,
                    rule.arg
                )
                if (error) {
                    errors.push(error);
                }
            })

        } else {
            if (rules) {
                const error = rules.validator(fieldName, this.state.values, rules.arg);
                if (error) {
                    errors.push(error)
                }
            }
        }
        const newErrors = { ...this.state.errors, [fieldName]: errors };
        this.setState({ errors: newErrors });
        return errors;
    }

    private validateForm(): boolean {
        const errors: IErrors = {};
        let haveError: boolean = false;
        Object.keys(this.props.defaultValues).map(fieldName => {
            errors[fieldName] = this.validate(
                fieldName, this.state.values[fieldName]);
            if (errors[fieldName].length > 0) {
                haveError = true;
            }
        });
        this.setState({ errors });
        return !haveError;
    }


    private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({ submitting: true });
            const result = await this.props.onSubmit(this.state.values);
            this.setState({
                errors: result.errors || {},
                submitted: result.success,
                submitting: false
            });
        }
    }

    public render() {
        const context: IFormContext = {
            errors: this.state.errors,
            values: this.state.values,
            setValue: this.setValue,
            validate: this.validate
        }
        return (
            <FormContext.Provider value={context}>
                <form className="form" noValidate={true} onSubmit={this.handleSubmit}>
                    <div>{this.props.children}</div> 
                    <div className="form-group">
                        <button type="submit"
                            disabled={this.state.submitting || this.state.submitted}
                        >Submit</button>
                    </div>
                </form>
            </FormContext.Provider>

        )
    }
}

Form.Field.defaultProps = {
    type: 'Text'
};


