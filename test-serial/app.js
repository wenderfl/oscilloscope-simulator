// Import dependencies
const SerialPort = require('serialport');

// Parser for Readline
// https://serialport.io/docs/api-parser-readline
const Readline = require('@serialport/parser-readline');

// Create a new serial port object with default options -> change the port according to oscilloscope port
const port = new SerialPort('COM3', {
	// baudRate: 9600
	baudRate: 9600
});

// Read the port data
const parser = new Readline();
port.pipe(parser);

parser.on('data', function(data) {
	console.log('Received Data:', data);
});

// Write to the port
port.write('main screen turn on', function(err) {
	if (err) {
			return console.log('Error on write: ', err.message);
	}
	console.log('message written');
});