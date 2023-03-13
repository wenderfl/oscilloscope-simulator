// This file is a module that contains the commands.acqCommands for the app.js file
// So, we need to export the class

module.exports = class Oscilloscope {
    // AVER needs to be a variable that can be changed in the app.js file, so we need to pass it as a parameter to the constructor
    constructor(AVER) {
        // Principal list of commands
        this.commands=[];
        this.commands.acqCommands=[]; // List of Acquisition Related commands
            this.commands.acqCommands.push(':ACQ:AVER'); // Asks for the current number of averages
            this.commands.acqCommands.push(':ACQ:LENG'); // Asks for the number of record length
            this.commands.acqCommands.push(':ACQ:MOD'); // Asks for the current mode
            this.commands.acqCommands.push(':ACQ1:MEM'); // Channel 1
            this.commands.acqCommands.push(':ACQ2:MEM'); // Channel 2
        this.commands.push(':AUT \n'); // Auto setup
        this.commands.chanCommands=[]; // List of Channel Related commands
            // Enable or disable the bandwidth limit function
            this.commands.chanCommands.push(':CHAN1:BW'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:BW'); // Channel 2
            // Select the different coupling states for the oscilloscope channels
            this.commands.chanCommands.push(':CHAN1:COUP'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:COUP'); // Channel 2
            // Enable or disable the display of the channel
            this.commands.chanCommands.push(':CHAN1:DISP'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:DISP'); // Channel 2
            // Enable or disable the waveform inversion function for the channel
            this.commands.chanCommands.push(':CHAN1:INV'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:INV'); // Channel 2
            // Select the different math functions for the oscilloscope channels
            this.commands.chanCommands.push(':CHAN1:MATH'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:MATH'); // Channel 2
            // Sets or query the offset voltage of the channel
            this.commands.chanCommands.push(':CHAN1:OFFS'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:OFFS'); // Channel 2
            // Sets or query the probe attenuation factor of the channel
            this.commands.chanCommands.push(':CHAN1:PROB'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:PROB'); // Channel 2
            // Sets or query the vertical scale of the channel
            this.commands.chanCommands.push(':CHAN1:SCAL'); // Channel 1
            this.commands.chanCommands.push(':CHAN2:SCAL'); // Channel 2
        this.commands.push(':COPY') // Same as pressing the HARDCOPY button
        this.commands.cursCommands=[]; // List of Cursor Related commands
            // Adjust the cursor position of X axis
            this.commands.cursCommands.push(':CURS:X');
            // Adjust the cursor position of Y axis
            this.commands.cursCommands.push(':CURS:Y');
            // Return the time or voltage diversity between the two vertical or horizontal cursors
            this.commands.cursCommands.push(':CURS:XDEL'); // Horizontal
            this.commands.cursCommands.push(':CURS:YDEL'); // Vertical
            // Enable or disable the display of the cursor
            this.commands.cursCommands.push(':CURS:XDIS'); // Horizontal
            this.commands.cursCommands.push(':CURS:YDIS'); // Vertical
            // Select wwhich channel the cursor is attached to
            this.commands.cursCommands.push(':CURS:SOUR');
            // Select the accumulate display mode

        this.commands.dispCommands=[]; // List of Display Related commands
            // Select the accumulate display mode
            this.commands.dispCommands.push(':DISP:ACC');
            // Select the contrast level of the display
            this.commands.dispCommands.push(':DISP:CONT');
            // Select graticule display mode
            this.commands.dispCommands.push(':DISP:GRAT');
            // Select the dots display for data points
            this.commands.dispCommands.push(':DISP:WAV');

        this.commands.gonCommands=[]; // List of Go/NoGo Related commands
            // Clear the Go/NoGo test result
            this.commands.gonCommands.push(':GON:CLE');
            // Start or stop the execution of the Go/NoGo test
            this.commands.gonCommands.push(':GON:EXEC');
            // Relieve or initialize the Go/NoGo test
            this.commands.gonCommands.push(':GON:FUNC');
            // Return the value of fail count and total count
            this.commands.gonCommands.push(':GON:NGC');
            // Sets and query the user-defined NO-GO conditions
            this.commands.gonCommands.push(':GON:NGD');
            // Sets and query the user-defined GO/NO-GO comparison source channel
            this.commands.gonCommands.push(':GON:SOUR');
            // Sets and query the user-defined GO/NO-GO violation condition
            this.commands.gonCommands.push(':GON:VIOL');

        this.commands.hardCommands=[]; // List of Hardcopy Related commands
            // Sets the output format of hardcopy to "ink-save" mode
            this.commands.hardCommands.push(':HARD:INK');
            // Sets the print-out of hardcopy in black and white or color
            this.commands.hardCommands.push(':HARD:LAY');
            // Select the harcopy output style
            this.commands.hardCommands.push(':HARD:MOD');
            // Select the print-out image size for hardcopy function
            this.commands.hardCommands.push(':HARD:RAT');

        this.commands.measCommands=[]; // List of Measurement Related commands
            // Select the first source for eight different delay time measurements
            this.commands.measCommands.push(':MEAS:DELAY1');
            this.commands.measCommands.push(':MEAS:DELAY2');
            // Return the value of timing measurement that taken for falling edge of the first pulse in the waveform
            this.commands.measCommands.push(':MEAS:FALL');
            // Return the time value that difference time between the first falling edge of source signal and the first falling edge of reference signal
            this.commands.measCommands.push(':MEAS:FFFD');
            // Return the time value that difference time between the first falling edge of source signal and the first rising edge of reference signal
            this.commands.measCommands.push(':MEAS:FFRD');
            // Return the ratio of waveform amplitude that expressed the difference between the low level and the negative peak level of the measured signal as it transitions from its high state to its low state
            this.commands.measCommands.push(':MEAS:FOVS');
            // Return the ratio of waveform amplitude that expressed the difference between the high level and the maximum level of the measured signal as it transitions from its high state to its low state
            this.commands.measCommands.push(':MEAS:FPR');
            // Return the value of frequency measurement
            this.commands.measCommands.push(':MEAS:FREQ');
            // Return the time value that difference time between the first rising edge of source signal and the first falling edge of reference signal
            this.commands.measCommands.push(':MEAS:FRFD');
            // Return the time value that difference time between the first rising edge of source signal and the first rising edge of reference signal
            this.commands.measCommands.push(':MEAS:FRRD');
            // Return the time value that difference time between the first falling edge of source signal and the first falling edge of reference signal
            this.commands.measCommands.push(':MEAS:LFFD');
            // Return the time value that difference time between the first falling edge of source signal and the last rising edge of reference signal
            this.commands.measCommands.push(':MEAS:LFRD');
            // Return the time value that difference time between the first rising edge of source signal and the last rising edge of reference signal
            this.commands.measCommands.push(':MEAS:LRRD');
            // Return the value of timing measurement of the first negative pulse in the waveform
            this.commands.measCommands.push(':MEAS:NWID');
            // Return the ratio of the positive pulse width to the signal period
            this.commands.measCommands.push(':MEAS:PDUT');
            // Return the timing value of period measurement
            this.commands.measCommands.push(':MEAS:PER');
            // Return the value of timing measurement of the first positive pulse in the waveform
            this.commands.measCommands.push(':MEAS:PWID');
            // Return the value of timing measurement that taken for rising edge of the first pulse in the waveform
            this.commands.measCommands.push(':MEAS:RIS');
            // Return the ratio of waveform amplitude that expressed the difference the difference between the high level and the positive peak leavel of the measured signal as it transitions from its low state to its high state
            this.commands.measCommands.push(':MEAS:ROVS');
            // Return the ratio of waveform amplitude that expressed the difference between the low level and the negative peak level of the measured signal as it transitions from its low state to its high state
            this.commands.measCommands.push(':MEAS:RPR');
            // Select the measured channel
            this.commands.measCommands.push(':MEAS:SOUR');
            // Return the voltages of high value minus low value
            this.commands.measCommands.push(':MEAS:VAMP');
            // Return the average voltages
            this.commands.measCommands.push(':MEAS:VAV');
            // Return the value of global high voltage
            this.commands.measCommands.push(':MEAS:VHI');
            // Return the value of global low voltage
            this.commands.measCommands.push(':MEAS:VLO');
            // Return the value of maximum amplitude voltage
            this.commands.measCommands.push(':MEAS:VMAX');
            // Return the value of minimum amplitude voltage
            this.commands.measCommands.push(':MEAS:VMIN');
            // Return the value of maximum minus minimum voltage
            this.commands.measCommands.push(':MEAS:VPP');
            // Return the value of RMS voltage
            this.commands.measCommands.push(':MEAS:VRMS');
    /* See the memory commands below ---- How to receive something as a parameter here?
        this.commands.memCommands=[]; // List of Memory Related commands
            //Recalls setup form internal non-volatile memory
            this.commands.memCommands.push(':MEM'+X+':REC:SET'); // X = 1-20
    */
        this.commands.push(':REFR'); // Refresh the screen
    /* See the Reference commands below ---- How to receive something as a parameter here?
        this.commands.refCommands=[]; // List of Reference Related commands
            // Select the reference waveform and display it on the screen
            this.commands.refCommands.push(':REF'+X+':DISP'); // X = 1-4 

    */
        this.commands.push(':RUN'); // Start the acquisition
        this.commands.push(':STOP'); // Stop the acquisition

        this.commands.tempCommands=[]; // List of Template Related commands
            // Sets and query the number of template used for maximum boundary
            this.commands.tempCommands.push(':TEMP:MAX');
            // Sets and query the number of template used for minimum boundary
            this.commands.tempCommands.push(':TEMP:MIN');
            // Sets and query the template mode
            this.commands.tempCommands.push(':TEMP:MOD');
            // Sets and query the position of maximum template
            this.commands.tempCommands.push(':TEMP:POS:MAX');
            // Sets and query the position of minimum template
            this.commands.tempCommands.push(':TEMP:POS:MIN');
            // Save the Auto template
            this.commands.tempCommands.push(':TEMP:SAV:AUT');
            // Save the maximum template
            this.commands.tempCommands.push(':TEMP:SAV:MAX');
            // Save the minimum template
            this.commands.tempCommands.push(':TEMP:SAV:MIN');
            // Sets and query the tolerance of auto template
            this.commands.tempCommands.push(':TEMP:TOL');

        this.commands.timCommands=[]; // List of Time Related commands
            // Sets the horizontal position parameter
            this.commands.timCommands.push(':TIM:DEL');
            // Sets the horizontal timescale per division
            this.commands.timCommands.push(':TIM:SCAL');
            // Selects the horizontal timebase sweep mode
            this.commands.timCommands.push(':TIM:SWE');
            // Setting and query the zoomed area for window zoomed display
            this.commands.timCommands.push(':TIM:WIND:DEL');
            // Sets and query the scale of the windows zoomed timebase
            this.commands.timCommands.push(':TIM:WIND:SCAL');

        this.commands.trigCommands=[]; // List of Trigger Related commands
            // Sets and query the type of trigger coupling
            this.commands.trigCommands.push(':TRIG:COUP');
            // Sets and query the user-defined delay trigger time
            this.commands.trigCommands.push(':TRIG:DEL:TIM');
            // Sets and query the user-defined delay trigger events
            this.commands.trigCommands.push(':TRIG:DEL:EVEN');
            // Sets and query the user-defined start trigger signal level
            this.commands.trigCommands.push(':TRIG:DEL:LEV');
            // Select and query the different start trigger signal level
            this.commands.trigCommands.push(':TRIG:DEL:MOD');
            // Select and query the different delay trigger settings
            this.commands.trigCommands.push(':TRIG:DEL:TYP');
            // Return the readout value of trigger frequency counter
            this.commands.trigCommands.push(':TRIG:FREQ');
            // Select and query the trigger level
            this.commands.trigCommands.push(':TRIG:LEV');
            // Select and query the trigger mode
            this.commands.trigCommands.push(':TRIG:MOD');
            // Switch and query the noise rejection mode
            this.commands.trigCommands.push(':TRIG:NREJ');
            // Switch and query different pulse trigger type
            this.commands.trigCommands.push(':TRIG:PULS:MOD');
            // Select the time value for pulse width
            this.commands.trigCommands.push(':TRIG:PULS:TIM');
            // Select and query the frequency rejection mode
            this.commands.trigCommands.push(':TRIG:REJ');
            // Switch and query the rising or falling trigger slope
            this.commands.trigCommands.push(':TRIG:SLOP');
            // Select and query the trigger source
            this.commands.trigCommands.push(':TRIG:SOUR');
            // Select and query the trigger type
            this.commands.trigCommands.push(':TRIG:TYP');
            // Select and query the field on which the video trigger mode will be triggered
            this.commands.trigCommands.push(':TRIG:VID:FIE');
            // Select and query the specified line for video signal
            this.commands.trigCommands.push(':TRIG:VID:LIN');
            // Select and query the imput video polarity
            this.commands.trigCommands.push(':TRIG:VID:POL');
            // Select and query the TV broadcast system
            this.commands.trigCommands.push(':TRIG:VID:TYP');

        this.commands.usbCommands=[]; // List of USB Related commands
            // Recall the setup from the USB flash disk
            this.commands.usbCommands.push(':USB:REC:SET');
            // Recall the saved waveform from the USB flash disk and save to reference
            this.commands.usbCommands.push(':USB:REC:WAV');
            // Save all oscilloscope setting, waveform raw data, and image to USB flash disk
            this.commands.usbCommands.push(':USB:SAV:ALL');
            // Save present waveform image to USB flash disk
            this.commands.usbCommands.push(':USB:SAV:IMAG');
            // Save all settings of oscilloscope to USB flash disk
            this.commands.usbCommands.push(':USB:SAV:SET');
            // Save present waveform raw data to USB flash disk
            this.commands.usbCommands.push(':USB:SAV:WAV');

    }
    writeCommand(command, value) {
        // Write the command to the oscilloscope
        var string = command + ' ' + value + ' \n';
        return string
    }
}