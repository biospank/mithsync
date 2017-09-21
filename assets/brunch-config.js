exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      // joinTo: "js/app.js",
      joinTo: {
        "js/app.js": [
          "js/**/*.js",
          "vendor/js/**/*.js",
          "node_modules/**/*.js",
          "../deps/**/*.js"
        ],
        "js/watch.js": [
          "watch/app/js/**/*.js",
          "watch/vendor/js/**/*.js",
          "node_modules/**/*.js",
          "../deps/**/*.js"
          // "../deps/**/*.js",
          // "../priv/static/phoenix.js"
        ],
      //  "js/app.js": /^(js)|(vendor)|(..\/deps)/,
      //  "js/watch.js": /^(watch)|(..\/deps)|(..\/priv\/static\/phoenix*)/
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
          "vendor/js/jquery-1.11.3.min.js",
          "vendor/js/lodash.min.js",
          "vendor/js/mithril.min.js",
          "vendor/js/mithril-stream.js"
        ]
      }
    },
    stylesheets: {
      // joinTo: "css/app.css"
      joinTo: {
        "css/app.css": [
          "css/**/*",
          "vendor/css/**/*"
        ],
        "css/fixed-layout.css": [
          "custom-css-layout/*.css"
        ],
        "css/watch.css": [
          "watch/app/css/**/*",
          "watch/vendor/css/**/*.css"
        ]
        // "css/app.css": /^(css)|(vendor)/,
        // "css/fixed-layout.css": /^(custom-css-layout)/,
        // "css/watch.css": /^(watch)/
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
    assets: /^(static)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ["static", "css", "js", "vendor", "watch", "custom-css-layout"],

    // Where to compile files to
    public: "../priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/vendor|watch\/vendor/]
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/app"],
      "js/watch.js": ["watch/app/js/watch"]
    }
  },

  npm: {
    enabled: true,
    // Whitelist the npm deps to be pulled in as front-end assets.
    // All other deps in package.json will be excluded from the bundle.
    whitelist: ["phoenix", "phoenix_html"]
  }
};
