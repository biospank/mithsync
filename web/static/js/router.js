import signIn from "./components/signin/sign_in";
import signUp from "./components/signup/sign_up";
import activationPage from "./components/signup/activation_page";
import resetRequestPage from "./components/password/reset_request_page";
import resetPage from "./components/password/reset_page";
import dashboard from "./components/dashboard/index";
import userProfile from "./components/user/user_profile";
import projectList from "./components/project/index";
import videoPage from "./components/video/index";
import newVideo from "./components/video/new";
import editVideo from "./components/video/edit";
import infoVideo from "./components/video/info";
import viewVideo from "./components/video/view";
import library from "./components/library/index";
import faq from "./components/faq/index";

export default m.route(document.getElementById('app'), "/", {
  // Login routing
  "/": dashboard,

  "/signin": signIn,

  "/signup": signUp,

  "/activate": activationPage,

  "/password/request": resetRequestPage,

  "/password/reset/:code": resetPage,

  "/userprofile": userProfile,

  "/projects": projectList,

  "/projects/:projectId/videos": videoPage,

  "/projects/:projectId/videos/new": newVideo,

  "/projects/:projectId/videos/:videoId/edit": editVideo,

  "/projects/:projectId/videos/:videoId/info": infoVideo,

  "/videos/view": viewVideo,

  "/projects/:projectId/videos/:videoId/library": library,

  "/faq": faq

});
