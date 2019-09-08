import React, {Component} from 'react';
import RegisterEmailSubmitted from "./RegisterEmailSubmitted";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from 'axios';
import API from "./API";

class RegisterHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isSubmitting: false,
            emailSubmitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    async handleSubmit (e) {
        e.preventDefault();
        console.log(e);
        const response = await API.post(
            'registerRequest',
            {emailAddress: this.state.email}
        )
        console.log(response.data)
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (this.state.emailSubmitted) {
            return <RegisterEmailSubmitted email={this.state.email}/>
        } else {
            return <Formik
                //initialValues={{email: '123'}}
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

                /*onSubmit={async (values, {setSubmitting}) => {
                    this.setState({emailSubmitted: true, email: values.email})

                    const response = await axios.post(
                        'http://localhost:8080',
                        {example: 'data'},
                        {headers: {'Content-Type': 'application/json'}}
                    )
                    console.log(response.data)

                    // todo: call back here
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}*/
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
                    <Form class="form-inline" onSubmit={this.handleSubmit}>
                        <div className="form-group mb-2">
                            <Field type="email" name="email" class="form-control sr-only-focusable"
                                   placeholder="name@example.com" onChange={this.handleChange}/>
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