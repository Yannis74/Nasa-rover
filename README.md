Nasa-rover
==========
@Author: John Souris
@Date: 12/05/2013

# Explanation and assumptions

I decided to use requireJS to define modules. I like the way I can define and divide distinct elements of the problem into separate files and allow requireJS to handle dependencies and loading of the files.

I have created a file for each of the following:
	nasaController
	rover
	grid
Also these utilities:
	pubsub: Jquery enhancement to help with Pub/Sub.
	logger: handles output to view

The 'nasaController' module manages the grid and rovers. It formats the input, defines the grid and registers the rovers. It then starts the rovers, after starting a rover it waits until it starts the next one.

As any number of rovers could exist I created a Rover class. 

I have used the Pub/Sub system for Loosely Coupling logic, especially between the rovers and grid. This has added some extra complexity to the Rover class but has also made the modules more flexable and scalable in terms of adding more features. All rovers send a "roverFinished" event when they have completed their commands. This event is 'listened' to by the "nasa" control object which then starts the next rover. 

I have purposely written verbose method and property names to aid understanding. Minification/concatination/compression could be handled as part of the build process.

# Test the Rovers

Tests are done using the framework jasmine through Testem.

If you have Node installed open the cmd and:

run: npm install testem -g

then in the Nasa-rover directory

run: testem

Note: you might need to refresh a couple of times. jasmine bug?
