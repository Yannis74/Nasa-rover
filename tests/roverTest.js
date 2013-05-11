require(['js/app/rover'], function(Rover) {

	describe('A Rover Model', function() {

		beforeEach(function() {
		  this.rover = new Rover({
		  	location: {"x":1,"y":5},
		  	position: 'S',
		  });
		});

	  it('should exist', function() {
	  	expect(Rover).toBeDefined();
	  });

	  it('should go to correct position when moving left', function() {
	  	this.move("L");
	  	expect.(this.getPosition()).toEqual("E");
	  });

	  it('should go to correct position when moving right', function() {
	  	this.move("R");
	  	expect.(this.getPosition()).toEqual("S");
	  });

	  it('should go to correct location when moving forward and maintain position', function() {
	  	this.move('M');
	  	expect.(this.getLocation()).toEqual({"x": 1,"y": 4});
	  	expect.(this.getPosition()).toEqual("S");
	  });
	  
	  it('Given a starting point and position of 1 2 N, after making the following moves LMLMLMLMM the Rover will be in the correct position', function() {
	  	this.setPosition('N');
	  	this.setLocation({"x": 1, "y": 2});
	  	this.move('LMLMLMLMM');
	  	expect.(this.getLocation()).toEqual({"x": 1,"y": 3});
	  	expect.(this.getPosition()).toEqual("N");
	  });

	});

});
