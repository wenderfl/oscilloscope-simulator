// Import dependencies
const { SerialPort } = require('serialport');

// Parser for Readline
// https://serialport.io/docs/api-parser-readline
const { ReadlineParser } = require('@serialport/parser-readline');

//Express dependencies
const express = require('express');
const app = express();

//Defining the views folder
app.set('views', './views');
app.set('view engine', 'html');

//Defining the routes
app.get('/', (req, res) => {
	  res.render('index');
});

//Initializing the server
const server = app.listen(3000, () => {
	  console.log('Server is running on port 3000');
});

// Async Function to List the available serial ports
async function listSerialPorts() {
	try {
		const ports = await SerialPort.list();
		console.log('ports', ports);
		return ports;
	} catch (err) {
		console.error('Error listing ports', err);
	}
}

// List serial ports and then print them
listSerialPorts().then((ports) => {
	ports.forEach(function(port){
		console.log("Port: ", port);
	});
});

// Create a new serial port object with default options -> change the port according to oscilloscope port
const port = new SerialPort({
	// Check https://serialport.io/docs/api-bindings-cpp#bindingport for more info
<<<<<<< HEAD
	path: 'COM6',
=======
	path: 'COM1',
>>>>>>> parent of 392d790 (Update app.js)
	baudRate: 9600
});

// Read the port data
<<<<<<< HEAD
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' })); 
=======
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
>>>>>>> parent of 392d790 (Update app.js)

// Log the received data
parser.on('data', function(data) {
	console.log('Received Data:', data);
});

<<<<<<< HEAD
// Import the commands module
const Oscilloscope = require('./commands.js');

// Create a new oscilloscope object
const oscilloscope = new Oscilloscope();

// Write the commands to the port
// writeCommand(command, parameter), where parameter can be ' ?' or ' <value>' and command is one of the commands in the commands.js file
var string = oscilloscope.writeCommand(oscilloscope.commands.timCommands[1], '5.000E-06');

function writeToPort(command) {
	port.write(command, function(err) {
		if (err) {
			return console.log('Error on write: ', err.message);
		}
	});
}

writeToPort(string); 

=======
// Write to the port
console.log('Writing to port');
port.write('Some available command here!', function(err) {
	if (err) {
		return console.log('Error on write: ', err.message);
	}
	console.log('message written');
});

// Write the rest of the program
>>>>>>> parent of 392d790 (Update app.js)
// Be aware that the program will not wait for the write/read opertions to finish before exiting (apart from the 5 seconds delay)
// More info at: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/

// Function to wait for a certain time
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// Wait for 5 seconds then exit
sleep(5000).then(() => {
	// Close the port
	port.close(function(err) {
		if (err) {
			return console.log('Error on close: ', err.message);
		}
		console.log('port closed');
	});

	// exit the program
	console.log('Exiting the program')
	process.exit(0);
});
