import React from "react";
import { Button, Form, Grid, Segment, Step, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { Link } from "react-router-dom";

const SingUpForm = (props) => {
  let isUserAuthenticated = props.authenticated;
  let signUp;

  const registration = async (event) => {
    event.preventDefault();

    try {
      let response = await auth.signUp({
        email: event.target.email.value,
        password: event.target.password.value,
        passwordconfirmation: event.target.passwordconfirmation.value,
      });
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

  if (isUserAuthenticated) {
    signUp = (
      <>
        <Step.Group>
          <Step completed>
            <Icon name='info' />
            <Step.Content>
              <Step.Title data-cy="message">You are successfully signed up!</Step.Title>
              <Step.Description>
                <Link data-cy="link" to={{ pathname: "/" }}>
                  Take me back to Home Page
                  </Link>
              </Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </>
    );
  } else {
    signUp = (
      <>
        <Segment placeholder>
          <Grid columns={1} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={registration} id="signup-form" data-cy="sign-up">
                <Form.Input
                  id="email"
                  icon="user"
                  iconPosition="left"
                  label={"Email"}
                  placeholder={"email"}
                  data-cy="email"
                />
                <Form.Input
                  id="password"
                  icon="lock"
                  iconPosition="left"
                  label={"Password"}
                  placeholder={"password"}
                  type="password"
                  data-cy="password"
                />
                <Form.Input
                  name="passwordconfirmation"
                  id="password-confirmation"
                  icon="lock"
                  iconPosition="left"
                  label={"Password confirmation"}
                  placeholder={"password confirmation"}
                  type="password"
                  data-cy="password-confirmation"
                />
                <Button
                  content={"Sign up now!"}
                  id="Signup"
                  primary
                  data-cy="button"
                />
                <p>{props.errorMessage}</p>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </>
    );
  }

  return (
    <>{signUp}</>
  )
};
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    errorMessage: state.errorMessage,
  };
};
export default connect(mapStateToProps)(SingUpForm);
