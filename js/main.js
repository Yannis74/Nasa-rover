// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js",
    "paths": {
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    },
    "shim": {
        "libs/pubsub": ["jquery"]
    }
});

define(["jquery", "app/grid", "app/rover", "libs/pubsub"], function($, grid, Rover) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {

        //console.log(grid.gridDimensions);
        grid.init({"x":6,"y":4});

        var r1 = new Rover({
            location: {"x":3,"y":3},
            position: "N",
        });
    });
});

