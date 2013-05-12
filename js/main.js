// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js",
    "paths": {
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min"
    },
    "shim": {
        "libs/pubsub": ["jquery"]
    }
});

define(["jquery", "app/grid", "app/rover", "app/nasaController", "app/logger", "libs/pubsub" ], function($, grid, Rover, nasa, logger) {
    $(function() {

        nasa.init(grid, Rover, logger);
    });
});

