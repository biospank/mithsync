import Project from "../../models/project";

var breadcrumb = {
  controller: function(project) {
    document.body.addEventListener("video:list:reload", function(e) {
      currentProject = Project.current();
      m.redraw();
    }, false);

    var currentProject = project;

    var slugMapping = {
      ''         : {
        'name' : 'Home',
        'urlTemplate'  : '/'
      },
      'projects' : {
        'name' : 'Projects',
        'urlTemplate'  : '/projects'
      },
      'videos' : {
        'project' : project,
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
        'name' : 'User',
        'urlTemplate'  : '/userprofile'
      }
    };

    return {
      crumbs: _.once(function() {
        return _.filter(_.uniq(_.split(m.route(), '/')), function(crumb) {
          return !_.includes(['new', 'edit'], crumb) && _.isNaN(_.parseInt(crumb));
        });
      }),
      slugFor: function(slug) {
        return slugMapping[slug];
      },
      projectNameSlug: function() {
        var project = this.slugFor(_.last(this.crumbs())).project;

        if(project)
          return m("li", [
            m("a", {
              href: "/projects/" + currentProject.id + "/videos",
              config: m.route
            }, currentProject.name)
          ]);
        else
          return "";

      }
    };
  },
  view: function(ctrl) {
    return m("ol.breadcrumb", [
      _.concat(
        _.initial(ctrl.crumbs()).map(function(crumb) {
          var slug = ctrl.slugFor(crumb);

          if(slug) {
            return m("li", [
              m("a", {
                href: _.template(slug['urlTemplate'])(),
                config: m.route
              }, slug['name'])
            ]);
          }
        }),
        ctrl.projectNameSlug(),
        m("li", ctrl.slugFor(_.last(ctrl.crumbs()))['name'])
      )
    ]);
  }
}

export default breadcrumb;
