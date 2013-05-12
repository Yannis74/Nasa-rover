define(["jquery"], function($){
    var log;
	var nasa = {
		$elInput: $(".nasaInput"),
		$elDeploy: $(".deploy"),
		deployments: [],
		rovers: [],
		roverIndex: -1,
		init: function(grid, Rover, logger){

			nasa.$elDeploy.click(function(){

                logger.clear();
                log = logger.log;
                nasa.reset();
				nasa.getCommands();
                nasa.grid = grid;
                nasa.grid.cleanup();
                nasa.grid.init(nasa.marsGrid, logger.log);
                nasa.registerAllRovers(Rover, logger);
                nasa.startRovers();

			});

			$.subscribe("roverFinished", nasa.startRovers);
		},
        reset: function(){
            var i = 0;
            nasa.deployments = [];
            for(i; nasa.rovers[i]; i++){
                nasa.rovers[i].rover.cleanup();
                nasa.rovers[i].rover = null;
                nasa.rovers[i].commands = "";
            }

            nasa.rovers = [];
            nasa.roverIndex = -1;
            nasa.marsGrid = null;
        },
        registerAllRovers: function(Rover, logger){
            $.each(nasa.deployments, function(){
                nasa.registerRover(new Rover({
                        location: this.location,
                        position: this.position,
                        log: logger.log    
                    }), this.commands);
            });
        },
		registerRover: function(rover, commands){
			nasa.rovers.push({"rover": rover, "commands": commands});
		},
		startRovers: function(){
            var commands;
            if( (nasa.rovers.length-1) === nasa.roverIndex){
                log("Nasa ground control: All rovers have completed their missions!");
                return;
            }
            nasa.roverIndex++;
			commands = nasa.rovers[nasa.roverIndex].commands;

			nasa.rovers[nasa.roverIndex].rover.move(commands);
		},
		getCommands: function(){
			var i = 1;
	        var nasaInput = nasa.cleanInput(nasa.$elInput.val());

	        nasaInput[0] = nasaInput[0].split(" ");

			nasa.marsGrid = {"x": parseInt(nasaInput[0][0], 10), 
							 "y": parseInt(nasaInput[0][1], 10)};
			
			for(i;nasaInput[i];i = i + 2){
				nasaInput[i] = nasaInput[i].split(" ");

				nasa.deployments.push({
					"location": { "x": parseInt(nasaInput[i][0], 10), 
								  "y": parseInt(nasaInput[i][1], 10) },
					"position": nasaInput[i][2],
					"commands": nasaInput[i+1]
				});
			}

		},
		cleanInput: function(input){
			var i = 0;
	        input = input.replace(/\n/g, ",").
					replace(/,,/g, ",").
					replace(/\s+/g, ' ').
					split(',');

			for(i;input[i];i++){
				input[i] = $.trim(input[i]);
			}

			return input;
		}
	};

	return nasa;

})