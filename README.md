Nasa-rover
==========
@Author: John Souris
@Date: 12/05/2013

Enclosed are three programming problems.  We ask that you read all three descriptions thoroughly then create a program to solve **ONE** of the problems.
If you choose to do more than one problem, we will choose and evaluate only one of your solutions.

For the solution, you can use any programming language of your choice, but it would be ideal if it could be submitted in plain HTML and Javascript, making it easy for us to test.
You may include any Javsacript libraries you like, such as JQuery etc. Please don’t worry about design/css, this is a purely functional test.

You may also include a brief explanation of your design and assumptions along with your code.

Please email a zip of your completed solution to us within three days.  As a general rule, we allow three days from the date that you receive this email to submit your code, but you may request more time if needed.

==========

INTRODUCTION TO THE PROBLEMS

All problems below require some kind of input. Ideally, if you could provide an HTML form that accepts input through a textarea, that would be great.
You should provide sufficient evidence that your solution is complete by, as a minimum, indicating that it works correctly against the supplied test data.

PROBLEM ONE: MARS ROVERS


A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the
rovers so that their on-board cameras can get a complete view of the
surrounding terrain to send back to Earth.

A rover's position and location is represented by a combination of x and y
co-ordinates and a letter representing one of the four cardinal compass
points. The plateau is divided up into a grid to simplify navigation. An
example position might be 0, 0, N, which means the rover is in the bottom
left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The
possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90
degrees left or right respectively, without moving from its current spot.
'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

INPUT:
The first line of input is the upper-right coordinates of the plateau, the
lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that have
been deployed. Each rover has two lines of input. The first line gives the
rover's position, and the second line is a series of instructions telling
the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces,
corresponding to the x and y co-ordinates and the rover's orientation.

Each rover will be finished sequentially, which means that the second rover
won't start to move until the first one has finished moving.


OUTPUT
The output for each rover should be its final co-ordinates and heading.

INPUT AND OUTPUT

Test Input:
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM

Expected Output:
1 3 N
5 1 E
==========

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
