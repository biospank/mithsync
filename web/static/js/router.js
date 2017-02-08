import signIn from "./components/signin/sign_in";
import signUp from "./components/signup/sign_up";
import activationPage from "./components/signup/activation_page";
import resetRequestPage from "./components/password/reset_request_page";
import resendActivationPage from "./components/signup/resend_activation_page";
import resetPage from "./components/password/reset_page";
import dashboard from "./components/dashboard/index";
import profile from "./components/user/profile";
import projectList from "./components/project/index";
import videoPage from "./components/video/index";
import newVideo from "./components/video/new";
import editVideo from "./components/video/edit";
import infoVideo from "./components/video/info";
import viewVideo from "./components/video/view";
import faq from "./components/faq/index";
import landingpage from "./components/landingpage/index";

export default m.route(document.getElementById('app'), "/", {
  // Login routing
  "/": landingpage,

  "/dashboard": dashboard,

  "/signin": signIn,

  "/signup": signUp,

  "/activate": activationPage,

  "/activate/resend": resendActivationPage,

  "/password/request": resetRequestPage,

  "/password/reset/:code": resetPage,

  "/userprofile": profile,

  "/projects": projectList,

  "/projects/:projectId/videos": videoPage,

  "/projects/:projectId/videos/new": newVideo,

  "/projects/:projectId/videos/:videoId/edit": editVideo,

  "/projects/:projectId/videos/:videoId/info": infoVideo,

  "/videos/view": viewVideo,

  "/faq": faq

});
