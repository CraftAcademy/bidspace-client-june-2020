import React, { useState, useEffect } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import auth from "../modules/auth";
import LoginForm from "./LoginForm";

const Navbar = (props) => {
  let isLoginVisible = props.renderLoginForm;
  let isUserAuthenticated = props.authenticated;
  let isCurrentUserSubscriber = props.userRole === "subscriber" ? true : false;
  
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleFormClick = (e, { name }) => {
    setActiveItem(name);

    if (isLoginVisible) {
      props.dispatch({
        type: "LOGIN_FORM_VISIBILITY",
        payload: { renderLoginForm: false },
      });
    } else {
      props.dispatch({
        type: "LOGIN_FORM_VISIBILITY",
        payload: { renderLoginForm: true },
      });
    }
  };

  const handleLogoutClick = (e, { name }) => {
    setActiveItem(name);
    auth.signOut();
    props.dispatch({
      type: "SIGNOUT",
      payload: { authenticated: false },
    });
    document.location.reload(true);
  };

  let becomeSubscriber;
  let registerUser;
  let userFunctions;
  let login;

  if (isCurrentUserSubscriber === false && isUserAuthenticated) {
    becomeSubscriber = (
      <Menu.Item
        as={Link}
        to={{ pathname: "/subscription" }}
        data-cy="button"
        id="subscribe-button"
        name="become subscriber"
        active={activeItem === "become subscriber"}
        onClick={handleItemClick}
      />
    );
  }

  if (isUserAuthenticated === false) {
    registerUser = (
      <Menu.Item
        name="Signup"
        id="signup"
        active={activeItem === "signup"}
        onClick={handleItemClick}
        data-cy="button"
        as={Link}
        to={{ pathname: "/registration" }}
      />
    );
  }

  if (isUserAuthenticated) {
    userFunctions = (
      <>
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={handleItemClick}
          data-cy="button"
        />
        <Menu.Item
          name="my-account"
          active={activeItem === "My Account"}
          onClick={handleItemClick}
          data-cy="button"
          as={Link}
          to={{ pathname: "/account/listings" }}
        />
        <Menu.Item
          name="settings"
          active={activeItem === "Settings"}
          onClick={handleItemClick}
          data-cy="button"
        />
      </>
    );
  }

  if (isUserAuthenticated) {
    login = (
      <Menu.Item
        position="right"
        name="logout"
        active={activeItem === "logout"}
        onClick={handleLogoutClick}
        data-cy="button"
      />
    );
  } else {
    login = (
      <Menu.Item
        position="right"
        name="login"
        active={activeItem === "login"}
        onClick={handleFormClick}
        data-cy="button"
      />
    );
  }

  return (
    <>
      <Segment inverted>
        <Menu id="navbar" inverted pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to={{ pathname: "/" }}
            data-cy="button"
          />
          <Menu.Item
            as={Link}
            to={{ pathname: "/contact-us" }}
            name="contact us"
            active={activeItem === "contact us"}
            onClick={handleItemClick}
            data-cy="button"
          />
          <Menu.Item
            as={Link}
            to={{ pathname: "/faq" }}
            name="F A Q"
            active={activeItem === "F A Q"}
            onClick={handleItemClick}
            data-cy="button"
          />
          {userFunctions}
          {login}
          {registerUser}
          {becomeSubscriber}
        </Menu>
        {props.renderLoginForm && (
          <Menu position="right" inverted>
            <Menu.Item position="right">
              <LoginForm />
            </Menu.Item>
          </Menu>
        )}
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    renderLoginForm: state.renderLoginForm,
    authenticated: state.authenticated,
    userRole: state.currentUser.role,
  };
};

export default connect(mapStateToProps)(Navbar);
