import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import logo from './logo.svg';
import './App.css';

const validate = values => {
  const errors = {};

  if (!values.email) {
    console.log('email is required');
    errors.email = 'Required';
  } else if (!/^.+@.+$/i.test(values.email)) {
    console.log('email is invalid');
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    console.log('password is required');
    errors.password = 'Required';
  }

  return errors;
};

const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} type={type} />
    </div>
    {touched &&
      error &&
      <div>
        {error}
      </div>}
  </div>;

let SignInForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field type="text" name="email" component={InputField} label="Email" />
      <Field
        type="password"
        name="password"
        component={InputField}
        label="Password"
      />
      <button type="submit">Sign in</button>
    </form>
  );
};

SignInForm = reduxForm({
  form: 'signIn',
  validate,
})(SignInForm);

class App extends Component {
  handleSignIn = values => {
    console.log('Submitting the following values:');
    console.log(`Email: ${values.email}`);
    console.log(`Password: ${values.password}`);
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Redux Form Sign In App</h2>
        </div>
        <p className="App-intro">Sign in here if you already have an account</p>
        <SignInForm onSubmit={this.handleSignIn} />
      </div>
    );
  }
}

export default App;
