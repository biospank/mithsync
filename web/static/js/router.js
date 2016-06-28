import signIn from "./components/signin/sign_in";
import signUp from "./components/signup/sign_up";
import retrievePsw from "./components/retrievepsw/retrieve_psw";
import dashboard from "./components/dashboard/index";
import userProfile from "./components/user/user_profile";

export default m.route(document.getElementById('app'), "/", {
  // Login routing
  "/": dashboard,

  "/signin": signIn,

  "/signup": signUp,

  "/retrievepsw": retrievePsw,

  "/userprofile": userProfile

});
