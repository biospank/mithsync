import mixinLayout from "../layout/mixin_layout";

const viewVideo = {
  view: mixinLayout((vnode) => {
    return [
      m("header", { class: "text-right" }, [
        m("a", { href:"/video/edit", oncreate: m.route.link, class: "btn btn-success" }, "Edit"),
        m("a", { href:"/library", oncreate: m.route.link, class: "btn btn-success" }, "Create Contents")
      ]),
      m(".row", [
        m(".col-sm-6", [
          m("div", [
            m("img", { src: "/images/videoplaceholder.jpg", class: "img-responsive" })
          ])
        ]),
        m(".col-sm-6", [
          m("div", [
            m("img", { src: "/images/slide-placeholder.png", class: "img-responsive" })
          ])
        ])
      ])
    ];
  })
}

export default viewVideo;
