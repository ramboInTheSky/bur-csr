import { ErrorMessage, Field, Form, Formik } from 'formik';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Yup from 'yup';
import connect from './connect';

export class UpdatePassword extends Component {
  // TODO: Add Form Validation
  render() {
    const signInSchema = Yup.object().shape({
      password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required')
    });

    return (
      <React.Fragment>
        <h1>This is the Login Form</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { logIn } = this.props;
            await logIn(values.email, values.password);
            setSubmitting(false);
            this.props.history.push('/');
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="password"
                component="span"
                className="formValidationError"
              />
              <Field
                type="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="passwordConfirmation"
                component="span"
                className="formValidationError"
              />
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        <button onClick={this.handleRegistrationClick}>Register</button>
      </React.Fragment>
    );
  }
}

// TODO: Default Props
// TODO: UpdatePassword propTypes

export default connect(UpdatePassword);
