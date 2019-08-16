import React, {Component} from 'react';
import RegisterEmailSubmitted from "./RegisterEmailSubmitted";
import {ErrorMessage, Field, Form, Formik} from "formik";

class RegisterHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {emailSubmitted: false};
    }

    render() {
        let content = ""

        if (this.state.emailSubmitted) {
            return <RegisterEmailSubmitted email={this.state.email}/>
        } else {
            return <Formik
                initialValues={{email: ''}}
                validate={values => {
                    let errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    this.setState({emailSubmitted: true, email: values.email})
                    // todo: call back here
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
                render={({
                             values,
                             errors,
                             status,
                             touched,
                             handleBlur,
                             handleChange,
                             handleSubmit,
                             isSubmitting,
                         }) => (
                    <Form class="form-inline">
                        <div className="form-group mb-2">
                            <Field type="email" name="email" class="form-control sr-only-focusable" placeholder="name@example.com"/>
                            <ErrorMessage name="email" component="div"/>

                            <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
                                Register
                            </button>
                        </div>
                    </Form>

                )}
            >

            </Formik>
        }
        /*return [
            content
        ]*/
    }
}

export default RegisterHandler;