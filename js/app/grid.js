define(["jquery", "app/logger"], function($, logger){
	var log = logger.log;

	var marsGrid = {
		gridDimensions: {"x":5,"y":5},
		init: function(grid){
			if(marsGrid.isValidGrid(grid)){
				marsGrid.gridDimensions = grid;	
				log("Mars grid dimensions set to " + grid.x +
					" " + grid.y);
			}else{
				alert("Not a valid grid, default grid will be used");
			}

			$.subscribe("canRoverMoveHere", marsGrid.isInsideGrid);
		},

		isInsideGrid: function(event, location){

			if(location && location.x && location.y){
				if(location.x < marsGrid.gridDimensions.x &&
					location.y < marsGrid.gridDimensions.y){

					$.publish("gridResponse", [true, location]);

					return true;
				}else{

					$.publish("gridResponse", [false, location]);

					return false;
				}
			}else{
				throw new Error("setLocation: argument must" +
					" be an object with x and y properties"
				);
			}
		},

		isValidGrid:function(grid){
			if(typeof grid !== undefined && grid.x && grid.y &&
				typeof grid.x === "number" &&
				 typeof grid.y === "number" ){

				return true;
			}else{
				return false;
			}
		}
	}

	return marsGrid;

})
