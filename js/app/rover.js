/**
Rover class
this module defines the Rover class and it's private vars/functions
Rover class constructor takes a configuration object.
configuration object properties:
		location: {"x":{number},"y":{number}},
		position: ["N"|"E"|"S"|"W"],
		[log: {function}] //a function that provides logging
**/
define(["jquery"], function($){
	//private vars
	var roverDefaults = {
		location: {"x":0,"y":0},
		position: "N"
	};

	var log = null;

	var strPositions = "NESW";

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

	var calculateNewPosition = function(command, currentPosition){
		var position,
			index = strPositions.indexOf(currentPosition);

		if(command === "L"){
			position = strPositions.substr(index - 1, 1);
		}else if(command === "R"){
			position = strPositions.substr(index + 1, 1);
		}

		return position;
	}

	var isValidLocation = function(location){
			if(typeof location !== "undefined" &&
				typeof location.x === "number" &&
				 typeof location.y === "number" ){

				return true;
			}else{
				return false;
			}
	}

	//Rover class constructor
	function Rover(config){
		var location;

		//if no position or location is given
		//then use the default position/location
		this.config = $.extend({}, roverDefaults, config);

		if( !isValidLocation(this.config.location) ){
			throw new Error("Rover constructor: location object is not valid");
		}

		//Use own logging method if not supplied
		if( !this.config.hasOwnProperty("log") ){
			this.config.log = this.setLogList;
		}

		//passed to private var for convenience
		log = this.config.log;

		location = this.getLocation();
		//this property identifies the rover for use in logs.
		this.roverTag = location.x + ' ' +
			location.y + ' ' +
			this.getPosition();

		this.deployRover();

	}

	Rover.prototype = {
		logList:[],
		deployRover: function(){

			this.askIfMoveIsPossible(this.getLocation(), function(move){
				var location;
				if(move === false){
					log("Rover '" + this.roverTag + "' could not complete " +
					"it's mission as it was deployed outside the designated area!");
				}else{
					location = this.getLocation();
					log("Rover '" + this.roverTag + "' has been deployed " +
					"at Mars location x:" + location.x + ' y:' + location.y +
					" facing: " + this.getPosition());
				}
			});

		},
		move: function(strCommands){
			var command,
				i = 0,
				location,
				position,
				len = strCommands.length;

			//loop thru move commands				
			while(strCommands.length > 0){

				command = strCommands.substr(0,1);
				location = this.getLocation();
				position = this.getPosition();

				log("Rover '" + this.roverTag + "' is executing command: " + 
					command + " and is located at: x" + location.x +
					" y:" + location.y + " facing: " + position);

				if(command === "L" || command === "R"){

					this.setPosition(command);
				}else if(command === "M"){

					//Store remaining move commands
					//and exit method. 'move' method will 
					//be restarted by 'moveForward' method. 
					this.remainingCommands = strCommands;

					//askIfMoveIsPossible raises asynchronous
					//event and results in moveForward being
					//triggered after response is made.
					this.askIfMoveIsPossible(
						calculateNewLocation(
							location,
							position
						),
						this.moveForward
					);

					return;
				}

				strCommands = strCommands.substr(1);

				i++;
			}

			location = this.getLocation();
			position = this.getPosition();

			log("Rover '" + this.roverTag + "' final location is: x" + 
				location.x + " y:" + location.y + " facing: " + position);

			$.publish("roverFinished");
			this.cleanup();

		},
		setLogList: function(strMessage){
			this.logList[this.logList.length] = strMessage;
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

			if(self.config.noGrid){
				callback(move, location);
			}
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

		setPosition: function(command){
			if(command === "L" || command === "R"){
				this.config.position = calculateNewPosition(command, this.getPosition());
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
		},
		getLastLog: function(){
			return this.logList[this.logList.length - 1];
		},
		cleanup: function(){
			$.unsubscribe("gridResponse");
		}
	}

	return Rover;

})
