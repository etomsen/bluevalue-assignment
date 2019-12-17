'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
  });
  app.import('vendor/jquery-3.4.1.js');
  app.import('vendor/summernote-lite.js');
  app.import('vendor/summernote-lite.css');

  return app.toTree();
};
