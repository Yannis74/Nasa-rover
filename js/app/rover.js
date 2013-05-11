define(["jquery", "app/logger"], function($, logger){
	//private vars
	var roverDefaults = {
		location: {"x":0,"y":0},
		position: "N",
		previousLocation: null,
		previousPosition: null
	};

	var log = logger.log;

	//private functions
	var calculateNewLocation = function(location, position){
		switch(position) {
			case "N":
				location.y += 1;
				break;
			case "E":
				location.x += 1;
				break;
			case "S":
				location.y -= 1;
				break;
			case "W":
				location.x -= 1;
				break;
		}
		return location;
	}

	var isValidLocation = function(location){
			if(typeof location !== undefined && location.x && location.y &&
				typeof location.x === "number" &&
				 typeof location.y === "number" ){

				return true;
			}else{
				return false;
			}
	}

	//Rover class constructor
	function Rover(config){
		//if no position or location is given
		//then use the default position/location
		this.config = $.extend({}, roverDefaults, config);

		//this property identifies the rover for use in logs.
		this.roverTag = this.config.location.x + ' ' +
			this.config.location.y + ' ' +
			this.config.position;

		this.deployRover();

	}

	Rover.prototype = {
		deployRover: function(){

			this.askIfMoveIsPossible(this.config.location, function(move){
				if(move === false){
					log("Rover '" + this.roverTag + "' could not complete " +
					"it's mission as it was deployed outside the designated area!");
				}else{
					log("Rover '" + this.roverTag + "' has been deployed " +
					"at Mars location " + this.config.location.x + ' ' +
					this.config.location.y);
				}
			});

		},
		move: function(strCommands){
			var command,
				i = 0,
				len = strCommands.length;

			//loop thru move commands				
			while(strCommands.length > 0){

				command = strCommands.substr(0,1);

				if(command === "L" || command === "R"){

					this.setPosition(command);
				}else if(command === "M"){
					//askIfMoveIsPossible raises asynchronous
					//event and results in moveForward being
					//triggered after response is made.
					this.askIfMoveIsPossible(
						calculateNewLocation(
							this.config.location,
							this.config.position
						),
						this.moveForward
					);
					//Store remaining move commands
					//and exit method. 'move' method will 
					//be restarted by 'moveForward' method. 
					this.remainingCommands = strCommands;
					return;
				}

				strCommands = strCommands.substr(1);
				i++;
			}

		},
		askIfMoveIsPossible: function(nextLocation, callback){
			var self = this;
			//Using Pub/Sub system for Loosely Coupled logic.
			$.unsubscribe("gridResponse");

			//listen to important messages
			$.subscribe("gridResponse", function(event, move, location){
				callback.call(self, move, location);
			});

			$.publish("canRoverMoveHere", [nextLocation] );
		},
		moveForward: function(move, newLocation){
			if(move){
				this.setLocation(newLocation);
				this.remainingCommands = this.remainingCommands.substr(1);
				//continue 'move' method with remaining commands
				this.move(this.remainingCommands);
			}else{
				log("Rover '" + this.roverTag + "' could not complete " +
					"it's mission as it moved outside the designated area");
			}
		},

		getPosition: function(){
			return this.config.position;
		},

		setPosition: function(position){
			if(command === "L" || command === "R"){
				this.position = position;
			}else{
				throw new Error("setPosition: argument must" +
					" be a string character of 'L' or 'R'"
				);	
			}
		},

		getLocation: function(){
			return this.config.location;
		},

		setLocation: function(location){

			if(isValidLocation(location)){
				this.config.location = location;
			}else{
				throw new Error("setLocation: argument must" +
					" be an object with x and y properties"
				);
			}
		}
	}

	return Rover;

})
