require(['js/app/rover'], function(Rover) {

    describe('A Rover Model', function() {

        beforeEach(function() {

          this.rover = {};
          this.rover = new Rover({
          	location: {"x":1,"y":5},
          	position: 'S',
          	noGrid: true
          });

        });

        it('should exist', function() {
        	expect(Rover).toBeDefined();
        });

        it('should go to correct position when moving left', function() {
        	this.rover.move("L");
        	expect(this.rover.getPosition()).toEqual("E");
        });

        it('should go to correct position when moving right', function() {
        	this.rover.move("R");
        	expect(this.rover.getPosition()).toEqual("W");
        });

        it('should terminate mission if invalid commands are supplied', function(){
            this.rover.move("KJKHH");
            expect(this.rover.getLastLog()).toMatch('Mission terminated!');
        });

        it('should go to correct location when moving forward and maintain position', function() {
        	this.rover.move('M');
        	expect(this.rover.getLocation()).toEqual({"x": 1,"y": 4});
        	expect(this.rover.getPosition()).toEqual("S");
        });

        it('Given a starting point of 1 2 N, performing commnds LMLMLMLMM results in location 1 3 N', function() {
        	this.rover.setPosition('N');
        	this.rover.setLocation({"x": 1, "y": 2});
        	this.rover.move('LMLMLMLMM');
        	expect(this.rover.getLocation()).toEqual({"x": 1,"y": 3});
        	expect(this.rover.getPosition()).toEqual("N");
        });

    });

});
