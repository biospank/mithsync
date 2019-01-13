import Video from "../../models/video";
import Clippy from "../../models/clippy";

var videoListItem = {
  oninit({attrs}) {
    this.video = attrs.video;
  },
  view({state}){
    return m("li", [
      m(".list media border radius", [
        m("a", {
          href: "",
          onclick: (event) => {
            // console.log(state.video);
            event.preventDefault();
            Video.current(state.video);
            m.route.set("/projects/" + state.video.project_id + "/videos/" + state.video.id + "/edit");
          },
          class: "list__contents" }, [
          m("figure", { class: "list__image media-left border-right hidden-xs hidden-sm hidden-md" }, [
            m("a", [
              m("img", {
                src: _.isEmpty(state.video.slides) ? '/images/thumb-placeholder.png' : _.first(state.video.slides).thumb_url,
                class: "media-object",
                width: "56"
              })
            ])
          ]),
          m(".list__body media-body", [
            m("h5", { class: "list__body-title mboth-0 text-uppercase" }, _.truncate(state.video.title, { length: 25 })),
            m("p", { class: "list__body-description mb-0 text-uppercase" }, _.truncate(state.video.description, { length: 30 }))
          ])
        ]),
        m(".list__buttons list__buttons--32", [
          m("a", {
            href: "#",
            class: "btn btn-default btn-square border btn-square--32",
            oncreate({state, dom}) {
              Clippy.init(dom, state.video);
            },
            onclick: (e) => {
              e.preventDefault();
            }
          }, [
            m("i", {
              class: "fa fa-code",
              "aria-hidden": true
            })
          ])
        ])
      ])
    ])
  }
}

export default videoListItem;
