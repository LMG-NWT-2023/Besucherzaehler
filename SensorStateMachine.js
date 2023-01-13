// JavaScript source code
var Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO
var sensor1 = new Gpio(17, "in", "both"); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var sensor2 = new Gpio(25, "in", "both"); //use GPIO pin 25 as input, and 'both' button presses, and releases should be handled

var sensor1Value = 0;
var sensor2Value = 0;

const States = {

	S0: "S0"

	//Eintreten
	E1: "E1",
	E2: "E2",
	E3: "E3",

	//Austreten
	A1: "A1",
	A2: "A2",
	A3: "A3",
	Error: "Error",
}
export.States = States

class StateMachine{

	state = States.S0

	log()
	{
		console.log(this.state)
	}
}