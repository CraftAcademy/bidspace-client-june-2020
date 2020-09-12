import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import auth from "../modules/auth";

const LoginForm = (props) => {
  const authenticate = async (event) => {
    event.preventDefault();
    try {
      let response = await auth.signIn(
        event.target.email.value,
        event.target.password.value
      );
      let currentUser

      if (response.data.data) {
        currentUser = {
          id: response.data.data.id,
          email: response.data.data.email,
          role: response.data.data.role
        }
      } else {
        currentUser = {
          id: response.data.id,
          email: response.data.email,
          role: response.data.role
        }
      }
      props.dispatch({
        type: "AUTHENTICATE",
        payload: {
          currentUser: currentUser
        },
      });
    } catch (error) {
      props.dispatch({
        type: "FAIL_AUTHENTICATE",
        payload: {
          errorMessage: error.response.data.errors[0],
        },
      });
    }
  };

  return (
    <>
      <Form inverted data-cy="login-form" onSubmit={authenticate} id="login-form">
        <Form.Group id="form-group">
          <Form.Field
            id="email"
            control={Input}
            label="Email"
            placeholder="Email"
            inline
            data-cy="email"
          />
          <Form.Field
            id="password"
            control={Input}
            label="Password"
            placeholder="Password"
            inline
            data-cy="password"
            type="password"
          />
          <Button
            data-cy="button"
            content="Login"
            id="login-submit"
            primary
            inline
          >
            Submit
          </Button>
        </Form.Group>

        <p>{props.errorMessage}</p>
      </Form>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
  };
};
export default connect(mapStateToProps)(LoginForm);
