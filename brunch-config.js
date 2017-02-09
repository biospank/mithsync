exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      // joinTo: "js/app.js",
      joinTo: {
       "js/app.js": /^(web\/static\/js)|(web\/static\/vendor)|(deps)/,
       "js/watch.js": /^(web\/static\/watch)|(deps)|(priv\/static\/phoenix*)/
      },

      // To use a separate vendor.js bundle, specify two files path
      // https://github.com/brunch/brunch/blob/stable/docs/config.md#files
      // joinTo: {
      //  "js/app.js": /^(web\/static\/js)/,
      //  "js/vendor.js": /^(web\/static\/vendor)|(deps)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // https://github.com/brunch/brunch/tree/master/docs#concatenation
      order: {
        before: [
          "web/static/vendor/js/jquery-1.11.3.min.js",
          "web/static/vendor/js/lodash.min.js",
          "web/static/vendor/js/mithril.min.js"
        ]
      }
    },
    stylesheets: {
      // joinTo: "css/app.css"
      joinTo: {
       "css/app.css": /^(web\/static\/css)|(web\/static\/vendor)/,
       "css/fixed-layout.css": /^(web\/static\/css-layout)/,
       "css/watch.css": /^(web\/static\/watch\/app)|(web\/static\/watch\/vendor)/
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/web/static/assets". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(web\/static\/assets)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "web/static",
      "test/static"
    ],

    // Where to compile files to
    public: "priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/web\/static\/vendor|web\/static\/watch\/vendor/]
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["web/static/js/app"],
      "js/watch.js": ["web/static/watch/app/js/watch"]
    }
  },

  npm: {
    enabled: true,
    // Whitelist the npm deps to be pulled in as front-end assets.
    // All other deps in package.json will be excluded from the bundle.
    whitelist: ["phoenix", "phoenix_html"]
  }
};
