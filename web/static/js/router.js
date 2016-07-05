import signIn from "./components/signin/sign_in";
import signUp from "./components/signup/sign_up";
import activationPage from "./components/signup/activation_page";
import resetRequestPage from "./components/password/reset_request_page";
import resetPage from "./components/password/reset_page";
import dashboard from "./components/dashboard/index";
import userProfile from "./components/user/user_profile";

export default m.route(document.getElementById('app'), "/", {
  // Login routing
  "/": dashboard,

  "/signin": signIn,

  "/signup": signUp,

  "/activate": activationPage,

  "/password/request": resetRequestPage,

  "/password/reset": resetPage,

  "/userprofile": userProfile

});
