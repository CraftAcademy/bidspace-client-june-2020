import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import LandingPage from "./components/LandingPage";
import ListingPage from "./components/ListingPage";
import LandlordPage from "./components/LandlordPage";
import SingleListing from "./components/SingleListing";
import { Elements } from "react-stripe-elements";
import Subscription from "./components/Subscription";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import MyAccount from "./components/MyAccount";
import MyOwnListing from "./components/MyOwnListing";
import Faq from "./components/Faq"
import ContactUs from "./components/ContactUs"
import auth from "./modules/auth";


const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const persistLogin = async () => {
      if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
        const tokenParams = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
        try {
          const response = await auth.validateToken(tokenParams);
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
          dispatch({
            type: "AUTHENTICATE",
            payload: {
              currentUser: currentUser
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    persistLogin()
  }, [])
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/rent-space" component={ListingPage}></Route>
        <Route exact path="/rentout-space" component={LandlordPage}></Route>
        <Route exact path="/listing/:id" component={SingleListing}></Route>
        <Route exact path="/registration" component={SignUpForm}></Route>
        <Route exact path="/account/listings" component={MyAccount}></Route>
        <Route exact path="/account/listings/:id" component={MyOwnListing}></Route>
        <Route exact path="/faq" component={Faq}></Route>
        <Route exact path="/contact-us" component={ContactUs}></Route>
        <Elements>
          <Route exact path="/subscription" component={Subscription}></Route>
        </Elements>
      </Switch>
      {props.renderSignUpForm && <SignUpForm />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    renderLoginForm: state.renderLoginForm,
    renderSignUpForm: state.renderSignUpForm,
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps)(App);
