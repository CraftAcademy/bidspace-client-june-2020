const initialState = {
  currentUser: { id: undefined, email: undefined, role: undefined },
  authenticated: false,
  renderLoginForm: false,
  renderSignUpForm: false,
  errorMessage: "",
};

export default initialState;