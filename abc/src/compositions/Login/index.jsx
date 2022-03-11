import { ErrorMessage, Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Yup from 'yup';
import { LOGIN_ERROR_MESSAGE } from '../../constants/errorMessages';
import connect from './connect';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionErrorMessage: undefined
    };
  }
  handleRegistrationClick = () => {
    this.props.history.push('/register');
  };

  // TODO: Add Form Validation
  render() {
    const signInSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid Email')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
    });

    return (
      <div className="form-container login">
        <h1>Account</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { logIn } = this.props;
            this.setState({
              ...this.state,
              submissionErrorMessage: undefined
            });
            logIn(values.email, values.password)
              .then(() => {
                setSubmitting(false);
                this.props.history.push('/');
              })
              .catch(e => {
                this.setState({
                  ...this.state,
                  submissionErrorMessage: LOGIN_ERROR_MESSAGE
                });
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="formErrorMessage">
                {this.state.submissionErrorMessage}
              </div>
              <label>
                Email
                <Field type="text" name="email" disabled={isSubmitting} />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="formValidationError"
                />
              </label>
              <label>
                Password
                <Field
                  type="password"
                  name="password"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="formValidationError"
                />
              </label>
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
              <span className="link" onClick={this.handleRegistrationClick}>
                Register
              </span>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

// TODO: Default Props

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  logIn: PropTypes.func.isRequired
};

export default connect(Login);
