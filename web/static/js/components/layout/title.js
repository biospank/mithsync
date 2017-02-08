var title = {
  controller: function() {
    var slugMapping = {
      'dashboard'         : {
        'name' : 'Dashboard'
      },
      'projects' : {
        'name' : 'Projects'
      },
      'videos' : {
        'name' : 'Videos'
      },
      'edit' : {
        'name' : "<%= _.truncate(title, { length: 70 }) %>"
      },
      'faq' : {
        'name' : 'Faq'
      },
      'userprofile' : {
        'name' : 'Profile'
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
  view: function(ctrl, title) {
    return m("h2", {
      class: "section-title pull-left"
    }, _.template(ctrl.slugFor(_.last(ctrl.crumbs()))['name'])({title}))
  }
}

export default title;
