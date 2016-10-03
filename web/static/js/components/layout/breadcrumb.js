var breadcrumb = {
  controller: function(url) {
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
        'name' : 'Videos',
        'urlTemplate'   : "/projects/<%= m.route.param('projectId') %>/videos"
      },
      'library' : {
        'name'  : 'Library',
        'urlTemplate'   : "/projects/<%= m.route.param('projectId') %>/videos/<%= m.route.param('videoId') %>/library"
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
      }
    };
  },
  view: function(ctrl) {
    return m("ol.breadcrumb", [
      _.concat(_.initial(ctrl.crumbs()).map(function(crumb) {
        var slug = ctrl.slugFor(crumb);

        if(slug) {
          return m("li", [
            m("a", {
              href: _.template(slug['urlTemplate'])(),
              config: m.route
            }, slug['name'])
          ]);
        }
      }), m("li", ctrl.slugFor(_.last(ctrl.crumbs()))['name']))
    ]);
  }
}

export default breadcrumb;
