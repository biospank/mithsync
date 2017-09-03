import mixinLayout from "../layout/mixin_layout";
import videoList from "./list";

const videoPage = {
  view: mixinLayout(() => {
    return [
      m(videoList)
    ];
  })
}

export default videoPage;
