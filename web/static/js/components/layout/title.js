var title = {
  oninit(vnode) {
    let slugMapping = {
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

    this.crumbs = _.once(() => {
      return _.filter(_.uniq(_.split(m.route.get(), '/')), (crumb) => {
        return !_.includes(['new'], crumb) && _.isNaN(_.parseInt(crumb));
      });
    });

    this.slugFor = (slug) => {
      return slugMapping[slug];
    };

  },
  view({state, attrs}) {
    return m("h2", {
      class: "section-title pull-left"
    }, _.template(state.slugFor(_.last(state.crumbs()))['name'])({title: attrs.title}))
  }
}

export default title;
