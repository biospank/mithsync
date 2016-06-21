import loginForm from "./components/login/loginForm";

export default m.route(document.getElementById('app'), "/", {
  // Login routing
  "/": loginForm

});
