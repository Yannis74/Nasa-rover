define(["jquery"], function($){

	var logger = {
		$el: $(".logger"),
		log: function(strText){
			logger.$el.append("<p>" + strText + "</p>");
		},
		clear: function(){
			logger.$el.empty();	
		},
	};

	return logger;

})