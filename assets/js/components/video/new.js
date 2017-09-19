import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import feedbackButton from "../widgets/feedback_button";
import Project from "../../models/project";
import Video from "../../models/video";
import UrlParser from "../../util/urlParser"

var newVideo = (() => {

  var content = ({state}) => {
    return [
      m(".col-sm-6 center-block", [
        m("h3", "Create a new Zinkroo"),
        //m("p", "Channels are where your team communicates. They’re best when organized around a topic — #leads, for example."),
        m("form", { class: "light-form", role: "form" }, [
          m(textField, {
            type: 'text',
            placeholder: 'Title',
            id: 'title',
            dataLabel: 'Title',
            oninput: m.withAttr("value", Video.model.title),
            error: state.errors()['title']
          }),
          m(textField, {
            field: 'textarea',
            rows: 9,
            placeholder: 'Description',
            id: 'description',
            dataLabel: 'Description',
            oninput: m.withAttr("value", Video.model.description),
            error: state.errors()['description']
          }),
          m(textField, {
            type: 'link',
            placeholder: 'Insert here your Youtube/Vimeo URL',
            id: 'url',
            dataLabel: 'Video Link',
            oninput: m.withAttr("value", Video.model.url),
            error: state.errors()['url']
          }),
          m(feedbackButton, {
            action: state.createVideo,
            label: 'Create',
            feedbackLabel: 'Creating...',
            style: 'btn btn-primary effect btn-lg'
          })
        ])
      ])
    ];
  };

  return {
    oninit(vnode){
      this.errors = m.stream({});

      this.createVideo = (args) => {
        if(this.isValidUrl(Video.model.url())) {
          var projectId = Project.current().id;
          return Video.create(projectId, args).then((response) => {
            Video.current(response.data);
            m.route.set("/projects/" + projectId + "/videos/" + response.data.id + "/edit");
          }, (e) => {
            this.errors(JSON.parse(e.message).errors);
          })
        } else {
          return this.rejectUrlVideo().then((value) => {}, (value) => {
            this.errors({
              url: value
            });
          });
        }
      };

      this.isValidUrl = (url) => {
        var urlParser = new UrlParser();
        urlParser.addProvider('vimeo');
        urlParser.addProvider('youtube');
        var infoUrl = urlParser.parse(url);
        if( infoUrl.provider === "unknown" ) {
          return false;
        } else {
          return true;
        }
      };

      this.rejectUrlVideo = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject("Invalid url for vimeo/youtube video");
          }, 1000);
        })
      };

    },
    view: mixinLayout(content)
  };
})();

export default newVideo;
