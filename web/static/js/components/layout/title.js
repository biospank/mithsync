var title = {
  controller: function(video) {
    var slugMapping = {
      ''         : {
        'name' : 'Dashboard'
      },
      'projects' : {
        'name' : 'Projects'
      },
      'videos' : {
        'name' : 'Videos'
      },
      'edit' : {
        'name' : _.truncate(video.title, { length: 70 })
      },
      'faq' : {
        'name' : 'Faq'
      },
      'userprofile' : {
        'name' : 'User'
      }
    };

    return {
      crumbs: _.once(function() {
        return _.filter(_.uniq(_.split(m.route(), '/')), function(crumb) {
          return !_.includes(['new'], crumb) && _.isNaN(_.parseInt(crumb));
        });
      }),
      slugFor: function(slug) {
        return slugMapping[slug];
      }
    };
  },
  view: function(ctrl) {
    return m("h2", {
      class: "section-title pull-left"
    }, ctrl.slugFor(_.last(ctrl.crumbs()))['name'])
  }
}

export default title;
