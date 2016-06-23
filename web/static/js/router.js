import signIn from "./components/signin/sign_in";
import signUp from "./components/signup/sign_up";
import retrievePsw from "./components/retrievepsw/retrieve_psw";

export default m.route(document.getElementById('app'), "/", {
  // Login routing
  "/": signIn,

  "/signup": signUp,

  "/retrievepsw": retrievePsw

});
