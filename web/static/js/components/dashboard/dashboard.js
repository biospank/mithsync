import mixinLayout from "../layout/mixin_layout";
import textField from "../widgets/text_field";
import dashboardBox from "./dashboard_box";
import Session from "../signin/session";

var dashboard = (function() {
  var dashboardItems = [
    {
      "image": "/images/icons/ico-ticket.png",
      "title": "Projects list",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." +
                    "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis." +
                    "Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "link": "/task",
      "btn": "Vai ai task"
    },
    {
      "image": "/images/icons/ico-notes.png",
      "title": "Appunti",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." +
                    "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis." +
                    "Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "link": "/notes",
      "btn": "Vai agli appunti"
    },
    {
      "image": "/images/icons/ico-rubric.png",
      "title": "Rubrica",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." +
                    "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis." +
                    "Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "link": "/rubric",
      "btn": "Vai alla rubrica"
    },
    {
      "image": "/images/icons/ico-users.png",
      "title": "Amministrazione Utenti",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." +
                    "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis." +
                    "Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "link": "/users",
      "btn": "Vai alla lista"
    }
  ];

  var content = function() {
    return [
      dashboardItems.map(dashboardBox)
    ];
  };

  return {
    controller: function() {
      if(!Session.token)
        m.route("/signin");
    },
    view: mixinLayout(content)
  };
})();

export default dashboard;
