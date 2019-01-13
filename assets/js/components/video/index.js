import mixinLayout from "../layout/mixin_layout";
import videoList from "./list";
import User from "../../models/user";

const videoPage = {
  oninit(vnode) {
    if(_.isEmpty(User.current())) {
      User.getCurrent().then((response) => {
        User.current(response.data);
      });
    }

  },
  view: mixinLayout(() => {
    return [
      m(videoList)
    ];
  })
}

export default videoPage;
