require(['js/app/rover'], function(Rover) {

	describe('A Rover Model', function() {


/**	  beforeEach(function(){
	  		this.person = new Person({
	  			last:'Way',
	  			age: 27
	  		})
	  });
*/

	  it('should exist', function() {
	  	expect(Rover).toBeDefined();
	  });


	  it('should be true', function(){
	  	var status = Rover;
	  	expect(status.r).toBe(true);
	  });



	});

});
