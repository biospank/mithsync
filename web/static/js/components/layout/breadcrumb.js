import Project from "../../models/project";

var breadcrumb = {
  oninit({attrs}) {
    document.body.addEventListener("video:list:reload", function(e) {
      this.currentProject = Project.current();
      m.redraw();
    }, false);

    this.currentProject = attrs.project;

    this.slugMapping = {
      'dashboard'         : {
        'name' : 'Dashboard',
        'urlTemplate'  : '/dashboard'
      },
      'projects' : {
        'name' : 'Projects',
        'urlTemplate'  : '/projects'
      },
      'videos' : {
        'project' : attrs.project,
        'name' : 'Videos',
        'urlTemplate'   : "/projects/<%= m.route.param('projectId') %>/videos"
      },
      'library' : {
        'name'  : 'Library',
        'urlTemplate'   : "/projects/<%= m.route.param('projectId') %>/videos/<%= m.route.param('videoId') %>/library"
      },
      'faq' : {
        'name' : 'Faq',
        'urlTemplate'  : '/faq'
      },
      'userprofile' : {
        'name' : 'Profile',
        'urlTemplate'  : '/userprofile'
      }
    };

    this.crumbs = _.once(() => {
      return _.filter(_.uniq(_.split(m.route.get(), '/')), (crumb) => {
        return !_.includes(['new', 'edit'], crumb) && _.isNaN(_.parseInt(crumb));
      });
    });

    this.slugFor = (slug) => {
      return this.slugMapping[slug];
    },

    this.projectNameSlug = () => {
      var project = this.slugFor(_.last(this.crumbs())).project;

      if(project)
        return m("li", [
          m("a", {
            href: "/projects/" + this.currentProject.id + "/videos",
            oncreate: m.route.link
          }, this.currentProject.name)
        ]);
      else
        return "";
    }
  },
  view({state}) {
    return m("ol.breadcrumb", [
      _.concat(
        _.initial(state.crumbs()).map((crumb) => {
          var slug = state.slugFor(crumb);

          if(slug) {
            return m("li", [
              m("a", {
                href: _.template(slug['urlTemplate'])(),
                oncreate: m.route.link
              }, slug['name'])
            ]);
          }
        }),
        state.projectNameSlug(),
        m("li", state.slugFor(_.last(state.crumbs()))['name'])
      )
    ]);
  }
};

export default breadcrumb;
