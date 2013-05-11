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

define(["jquery", "app/grid", "app/rover", "app/logger", "app/nasaController", "libs/pubsub" ], function($, grid, Rover, logger) {
    $(function() {

        var nasaInput = $('.nasaInput').val();
        nasaInput = nasaInput.replace(/\n/g, ",");
            console.log(nasaInput);    
        nasaInput = nasaInput.replace(/,,/g, ",");
        console.log(nasaInput);
        nasaInput = nasaInput.replace(/\s+/g, ' ');
        console.log(nasaInput);
        nasaInput = nasaInput.split(',');
        console.log($.trim(nasaInput[0]));
               console.log($.trim(nasaInput[1]));
                           console.log($.trim(nasaInput[2]));
        //nasa.gridDimensions
        $.each(nasa.roverCommands, function(){
            nasa.registerRovers(new Rover({
                    location: this.deploy.location,
                    position: this.deploy.position,
                    log: logger.log    
                })
            );
        });

        nasa.startRovers();
        
        return;
        grid.init({"x":5,"y":5}, logger.log);

        var r1 = new Rover({
            location: {"x":1,"y":2},
            position: "N",
            log: logger.log
        });

        r1.move("LMLMLMLMMMMMMM");


    });
});

