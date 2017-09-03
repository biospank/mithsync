import Image from "../../models/image";

const thumbItem = {
  oninit({attrs}){
    this.currentImage = m.stream(image);
    this.callback = attrs.callback;

    this.selectImage = () => {
      this.callback(this.currentImage());
    };
  },
  view({state}){
    return m(".col-xs-2", [
      m("figure", { class: "img-thumbnail" }, [
        m("a", {
          href: "#",
          onclick: state.selectImage
        }, [
          m("img", {
            src: state.currentImage().thumb_url,
            title: state.currentImage().name,
            class: "img-responsive"
          })
        ])
      ])
    ]);
  }
}

export default thumbItem;
