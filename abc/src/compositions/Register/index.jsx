import { ErrorMessage, Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Yup from 'yup';
import Checkbox from '../../components/formikComponents/checkbox';
import connect from './connect';
import './index.css';

const initialValues = {
  firstName: '',
  lastName: '',
  title: '',
  email: '',
  password: '',
  emailSubscription: false,
  postSubscription: false,
  phoneSubscription: false,
  messagingSubscription: false,
  privacyPolicyConsent: false,
  userProfilingConsent: false,
  thirdPartyConsent: false
};
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialValues
    };
  }

  render() {
    const signUpSchema = Yup.object().shape({
      firstName: Yup.string()
        .min(4, 'Too Short!')
        .max(16, 'Too Long')
        .required('Required'),
      lastName: Yup.string()
        .min(4, 'Too Short!')
        .max(16, 'Too Long')
        .required('Required'),
      phone: Yup.string()
        .min(11)
        .required('Required'),
      email: Yup.string()
        .email('Invalid Email')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      privacyPolicyConsent: Yup.bool()
        .test('privacyPolicyConsent', 'Please Agree', value => value === true)
        .required('Required'),
      userProfilingConsent: Yup.bool()
        .test('userProfilingConsent', 'Please Agree', value => value === true)
        .required('Required'),
      thirdPartyConsent: Yup.bool()
        .test('thirdPartyConsent', 'Please Agree', value => value === true)
        .required('Required')
    });
    return (
      <div className="form-container registration">
        <h1>Registration</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { registerUser } = this.props;
            registerUser(values)
              .then(() => {
                setSubmitting(false);
                this.props.history.push('/registerSuccess');
              })
              .catch(e => {
                //TODO: Handle errors gracefully
                console.log(e);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>
                Title
                <Field component="select" name="title">
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                </Field>
              </label>
              <label>
                First Name
                <Field type="text" name="firstName" disabled={isSubmitting} />
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className="errorMessage"
                />
              </label>
              <label>
                Last Name
                <Field type="text" name="lastName" disabled={isSubmitting} />
                <ErrorMessage
                  name="lastName"
                  component="span"
                  className="errorMessage"
                />
              </label>
              <label>
                Phone
                <Field type="tel" name="phone" disabled={isSubmitting} />
                <ErrorMessage
                  name="phone"
                  component="span"
                  className="errorMessage"
                />
              </label>
              <label>
                Email
                <Field type="text" name="email" disabled={isSubmitting} />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="errorMessage"
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
                  className="errorMessage"
                />
              </label>
              <div className={'subscriptionBox'}>
                <h2>Subscription</h2>
                <Field
                  component={Checkbox}
                  name="emailSubscription"
                  id="emailSubscription"
                  label="Email"
                  disabled={isSubmitting}
                />
                <Field
                  component={Checkbox}
                  name="postSubscription"
                  id="postSubscription"
                  label="postSubscription"
                  disabled={isSubmitting}
                />
                <Field
                  component={Checkbox}
                  name="phoneSubscription"
                  id="phoneSubscription"
                  label="phoneSubscription"
                  disabled={isSubmitting}
                />
                <Field
                  component={Checkbox}
                  name="messagingSubscription"
                  id="messagingSubscription"
                  label="messagingSubscription"
                  disabled={isSubmitting}
                />
              </div>

              <div className={'consentBox'}>
                <h2>Consent</h2>
                <Field
                  component={Checkbox}
                  id="privacyPolicyConsent"
                  name="privacyPolicyConsent"
                  label="privacyPolicyConsent"
                  disabled={isSubmitting}
                />

                <Field
                  component={Checkbox}
                  id="userProfilingConsent"
                  name="userProfilingConsent"
                  label="userProfilingConsent"
                  disabled={isSubmitting}
                />

                <Field
                  component={Checkbox}
                  id="thirdPartyConsent"
                  name="thirdPartyConsent"
                  label="thirdPartyConsent"
                  disabled={isSubmitting}
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

// TODO: Default Props

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  registerUser: PropTypes.func.isRequired
};

export default connect(Register);
