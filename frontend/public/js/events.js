$(document).ready(function(){
    const signalGeneratorOffcanvasCH1 = $('#signalGeneratorOffcanvasCH1');
    const signalGeneratorOffcanvasCH2 = $('#signalGeneratorOffcanvasCH2');
    const measureAllCH1Offcanvas = $('#measureAllCH1');
    const measureAllCH2Offcanvas = $('#measureAllCH2');
    const signalGeneratorDragHeaderCH1 = $('#signalGeneratorDragHeaderCH1');
    const signalGeneratorDragHeaderCH2 = $('#signalGeneratorDragHeaderCH2');
    const measureAllCH1dragHeader = $('#measureAllCH1Drag');
    const measureAllCH2dragHeader = $('#measureAllCH2Drag');
    let signalGeneratorCH1isDragging = false;
    let signalGeneratorCH2isDragging = false;
    let measureAllCH1isDragging = false;
    let measureAllCH2isDragging = false;
    d3.csv('waveforms/dc.csv').then(data => {
            dcSignal = JSON.parse(JSON.stringify(data));
    }).catch(error => {
        console.error(error);
    });
//? Power Button --------------------------------------------------------------------------------------------
    $("#power").click(function(){
        // Display the oscilloscope modes
        if(powerFlag == 0){
            offCanvas = 1;
            $("#modeOffcanvas").css("display", "block");
            decreaseOpacity();
        }
        // If the oscilloscope is on, turn it off
        else if(powerFlag == 1){ power(); }
    });
//? ---------------------------------------------------------------------------------------------------------
//? Mode Offcanvas related events ---------------------------------------------------------------------------
    $("#modeCloseButton").click(function(){
        turnOffOffcanvas();
    });
    $("#simulation").click(function(){
        // Simulation mode is selected and it turns on the oscilloscope
        if(mode == "acquisition"){ resetMode(); }
        mode = "simulation";
        turnOffOffcanvas();
        power();
    });
    $("#acquisition").click(function(){
        // Acquisition mode is selected and it turns on the oscilloscope
        if(mode == "simulation"){ resetMode(); }
        turnOffOffcanvas();
        alert("The oscilloscope is not on"); //! Temporário
        //sendGetRequest("/acquisition");
    });
//? ---------------------------------------------------------------------------------------------------------
//? #inputs events ------------------------------------------------------------------------------------------
    $("#CH1Input").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1 && mode == "simulation"){inputCH1();}
        else if(powerFlag == 1 && mode == "acquisition"){ alert("The signal is received from the oscilloscope"); }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#CH1Input").contextmenu(function(e){
        e.preventDefault();
        if(powerFlag == 1 && mode == "simulation"){
            offCanvas = 1;
            $("#inputOffcanvas-ch1").css("display", "block");
            decreaseOpacity();
        }
        else if(powerFlag == 1 && mode == "acquisition"){ alert("The signal is received from the oscilloscope"); }
        else{ checkAndAlertOscilloscopeStatus(); }
    });

    $("#CH2Input").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1 && mode == "simulation"){inputCH2();}
        else if(powerFlag == 1 && mode == "acquisition"){ alert("The signal is received from the oscilloscope"); }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#CH2Input").contextmenu(function(e){
        e.preventDefault();
        if(powerFlag == 1 && mode == "simulation"){
            offCanvas = 1;
            $("#inputOffcanvas-ch2").css("display", "block");
            decreaseOpacity();
        }
        else if(powerFlag == 1 && mode == "acquisition"){ alert("The signal is received from the oscilloscope"); }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
//? ---------------------------------------------------------------------------------------------------------
//? input Offcanvas events ----------------------------------------------------------------------------------
    $("#inputCloseButton-ch1").click(function(){
        turnOffOffcanvas();
    });
    $("#inputCloseButton-ch2").click(function(){
        turnOffOffcanvas();
    });
    $("#calibration-ch1").click(function(){
        // Calibration mode is selected for CH1, calibration is a square wave with 1Vpp and 1kHz
        turnOffOffcanvas();
        calibration("CH1");
    });
    $("#calibration-ch2").click(function(){
        // Calibration mode is selected for CH2, calibration is a square wave with 1Vpp and 1kHz
        turnOffOffcanvas();
        calibration("CH2");
    });
    $("#signalGeneratorSignal-ch1").click(function(){
        // Signal Generator mode is selected, the user will see the signal generator interface
        turnOffOffcanvas();
        signalGeneratorCH1();
    });
    $("#signalGeneratorSignal-ch2").click(function(){
        // Signal Generator mode is selected, the user will see the signal generator interface
        turnOffOffcanvas();
        signalGeneratorCH2();
    });
    $("#externalFile-ch1").click(function(){
        // The user will be able to upload a CSV file
        turnOffOffcanvas();
        CH1ExtSignal = 1;
        CH2ExtSignal = 0;
        $("#csvFileInput").trigger('click');
    });
    $("#externalFile-ch2").click(function(){
        // The user will be able to upload a CSV file
        turnOffOffcanvas();
        CH1ExtSignal = 0;
        CH2ExtSignal = 1;
        $("#csvFileInput").trigger('click');
    });
    $("#csvFileInput").change(function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            processData(csvData); // Chame a função processData() com os dados do CSV
          };
          reader.readAsText(file); // Leia o arquivo como texto
      });
    // Acquisition-only mode + hold mode if stop button is pressed
    $("#realSignal-ch1").click(function(){
        // If the connection with the Oscilloscope is established, the user will be able to receive the signal from the oscilloscope
        turnOffOffcanvas();
        alert("The oscilloscope is not on"); //! Temporário
        //realSignal("CH1");
    });
    $("#realSignal-ch2").click(function(){
        // If the connection with the Oscilloscope is established, the user will be able to receive the signal from the oscilloscope
        turnOffOffcanvas();
        alert("The oscilloscope is not on"); //! Temporário
        //realSignal("CH2");
    });
//? ---------------------------------------------------------------------------------------------------------

//? #trigger events ------------------------------------------------------------------------------------
    $("#triggerLevel").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){
            // Increments the trigger level
            trigger.level += 0.05;
            triggerLevel();
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#triggerLevel").contextmenu(function(e){
        if(powerFlag == 1){
            // Decrements the trigger level
            e.preventDefault();
            trigger.level -= 0.05;
            triggerLevel();
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#triggerLevel").on("wheel", function(e) {
        if(powerFlag == 1){
            // Increments the trigger level when scrolling up
            if (e.originalEvent.deltaY < 0) {
                trigger.level += 0.01;
                triggerLevel();
            }
            // Decrements the trigger level when scrolling down
            else if (e.originalEvent.deltaY > 0) {
                trigger.level -= 0.01;
                triggerLevel();
            }
        }
    });
    //When the mouse enters the trigger level, the body becomes unscrollable, needed for the mousewheel event
    $("#triggerLevel").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#triggerLevel").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    $("#triggerMenu").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){
            menuTrigger();
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });

//? Vertical Position CH1 -----------------------------------------------------------------------------------

    $("#verticalPositionCH1").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        else if(powerFlag == 1){
            // Increments the vertical scale of channel 1
            if(CH1Display == 1){
                verticalPositionValueCH1 += 0.05;
                verticalPositionCH1();
            }
            else{
                //alert("Channel 1 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalPositionCH1").contextmenu(function(e){
        if(powerFlag == 1){
            // Decrements the vertical scale of channel 1
            if(CH1Display == 1){
                e.preventDefault();
                verticalPositionValueCH1 -= 0.05;
                verticalPositionCH1();
            }
            else{
                //alert("Channel 1 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalPositionCH1").on("wheel", function(e) {
        if(powerFlag == 1){
            // Increments the vertical scale of channel 1 when scrolling up
            if (e.originalEvent.deltaY < 0) {
                if(CH1Display == 1){
                    verticalPositionValueCH1 += 0.01;
                    verticalPositionCH1();
                }
            }
            // Decrements the vertical scale of channel 1 when scrolling down
            else if (e.originalEvent.deltaY > 0) {
                if (CH1Display == 1) {
                    verticalPositionValueCH1 -= 0.01;
                    verticalPositionCH1();
                }
            }
        }
    });
    
    //When the mouse enters the vertical position of channel 1, the body becomes unscrollable, needed for the mousewheel event
    $("#verticalPositionCH1").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#verticalPositionCH1").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
//? Vertical Position CH2 -----------------------------------------------------------------------------------
    $("#verticalPositionCH2").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        else if(powerFlag == 1){
            // Increments the vertical scale of channel 2
            if(CH2Display == 1){
                verticalPositionValueCH2 += 0.05;
                verticalPositionCH2();
            }
            else{
                //alert("Channel 2 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalPositionCH2").contextmenu(function(e){
        if(powerFlag == 1){
            // Decrements the vertical scale of channel 2
            if(CH2Display == 1){
                e.preventDefault();
                verticalPositionValueCH2 -= 0.05;
                verticalPositionCH2();
            }
            else{
                //alert("Channel 2 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalPositionCH2").on("wheel", function(e) {
        if(powerFlag == 1){
            // Increments the vertical scale of channel 2 when scrolling up
            if (e.originalEvent.deltaY < 0) {
                if(CH2Display == 1){
                    verticalPositionValueCH2 += 0.01;
                    verticalPositionCH2();
                }
            }
            // Decrements the vertical scale of channel 2 when scrolling down
            else if (e.originalEvent.deltaY > 0) {
                if (CH2Display == 1) {
                    verticalPositionValueCH2 -= 0.01;
                    verticalPositionCH2();
                }
            }
        }
    });
    //When the mouse enters the vertical position of channel 2, the body becomes unscrollable, needed for the mousewheel event
    $("#verticalPositionCH2").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#verticalPositionCH2").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
//? Horizontal Position -------------------------------------------------------------------------------------
    $("#horizontalPosition").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        else if(powerFlag == 1){
            if(horizontalSweep == 0){
                // Increments the horizontal scale
                horizontalPositionValue += 0.025;
                horizontalPosition();
            }
            else if(horizontalSweep == 4){
                $("#alertMessage").css("display", "block");
                $("#alertMessage").text("Not support under this mode");
                if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                timeoutId = setTimeout(() => { 
                    $("#alertMessage").css("display", "none"); 
                }, 2000); // After 2 seconds, the alert message disappears
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#horizontalPosition").contextmenu(function(e){
        if(powerFlag == 1){
            // Decrements the horizontal scale
            e.preventDefault();
            if(horizontalSweep == 0){
                horizontalPositionValue -= 0.025;
                horizontalPosition();
            }
            else if(horizontalSweep == 4){
                $("#alertMessage").css("display", "block");
                $("#alertMessage").text("Not support under this mode");
                if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                timeoutId = setTimeout(() => { 
                    $("#alertMessage").css("display", "none"); 
                }, 2000); // After 2 seconds, the alert message disappears
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#horizontalPosition").on("wheel", function(e) {
        if(powerFlag == 1){
            // Increments the horizontal scale when scrolling up
            if (e.originalEvent.deltaY < 0) {
                if(horizontalSweep == 0){
                    horizontalPositionValue += 0.025;
                    horizontalPosition();
                }
                else if(horizontalSweep == 4){
                    $("#alertMessage").css("display", "block");
                    $("#alertMessage").text("Not support under this mode");
                    if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                    timeoutId = setTimeout(() => { 
                        $("#alertMessage").css("display", "none"); 
                    }, 2000); // After 2 seconds, the alert message disappears
                }
            }
            // Decrements the horizontal scale when scrolling down
            else if (e.originalEvent.deltaY > 0) {
                if(horizontalSweep == 0){
                    horizontalPositionValue -= 0.025;
                    horizontalPosition();
                }
                else if(horizontalSweep == 4){
                    $("#alertMessage").css("display", "block");
                    $("#alertMessage").text("Not support under this mode");
                    if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                    timeoutId = setTimeout(() => { 
                        $("#alertMessage").css("display", "none"); 
                    }, 2000); // After 2 seconds, the alert message disappears
                }
            }
        }
    });
    //When the mouse enters the horizontal position, the body becomes unscrollable, needed for the mousewheel event
    $("#horizontalPosition").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#horizontalPosition").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
//? Oscilloscope Menus events -------------------------------------------------------------------------------
    $("#autoSet").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){autoSet();}
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#hardcopy").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){
            offCanvas = 1;
            $("#hardcopyOffcanvas").css("display", "block");
            decreaseOpacity();
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $('#measure').click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){
            if(measureFlag == 0 || measureFlag == 2){
                measureFlag = 1;
                measureMenu1();
            }
            else if(measureFlag == 1){
                measureFlag = 2;
                measureMenu2();
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#mathMenu").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){menuMath();}
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#runStop").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){ runStop(); }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#acquire").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){ 
            if(mode == "acquisition"){ menuAcquire(); } 
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#horizontalMenu").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas(); }
        else if(powerFlag == 1){ menuHorizontal(); }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
//? ---------------------------------------------------------------------------------------------------------
//? Measure All events --------------------------------------------------------------------------------------
    $("#measureAllCH1MinimizeButton").click(function(){
        $("#measureAllCH1Body1").css("display", "none");
        $("#measureAllCH1Body2").css("display", "none");
        $("#measureAllCH1MinimizeButton").css("display", "none");
        $("#measureAllCH1MaximizeButton").css("display", "block");
        $("#measureAllCH1").css("width", "250px");
        $("#measureAllCH1").css("height", "39px");
    });
    $("#measureAllCH1MaximizeButton").click(function(){
        $("#measureAllCH1Body1").css("display", "block");
        $("#measureAllCH1Body2").css("display", "block");
        $("#measureAllCH1MinimizeButton").css("display", "block");
        $("#measureAllCH1MaximizeButton").css("display", "none");
        $("#measureAllCH1").css("width", "367px");
        $("#measureAllCH1").css("height", "295px");
    });
    $("#measureAllCH1CloseButton").click(function(){
        $("#measureAllCH1").css("display", "none");
    });
    $("#measureAllCH1").click(function(){
        $("#measureAllCH1").css("z-index", "5");
        $("#measureAllCH2").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "4");
    });
    measureAllCH1dragHeader.on('mousedown', function(e){
        measureAllCH1isDragging = true;
        $("#measureAllCH1").css("z-index", "5");
        $("#measureAllCH2").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "4");
        const currentX = parseFloat( measureAllCH1Offcanvas.css('left'));
        const currentY = parseFloat( measureAllCH1Offcanvas.css('top'));
        startX = e.pageX - currentX;
        startY = e.pageY - currentY;
        measureAllCH1Offcanvas.addClass('grabbing');
    });
    $(document).on('mousemove', function(e) {
        if (measureAllCH1isDragging) {
            const x = e.pageX - startX;
            const y = e.pageY - startY;
            measureAllCH1Offcanvas.css('left', `${x}px`);
            measureAllCH1Offcanvas.css('top', `${y}px`);
        }
    });
    $(document).on('mouseup', function() {
        measureAllCH1isDragging = false;
        measureAllCH1Offcanvas.removeClass('grabbing');
    });
    $("#measureAllCH2MinimizeButton").click(function(){
        $("#measureAllCH2Body1").css("display", "none");
        $("#measureAllCH2Body2").css("display", "none");
        $("#measureAllCH2MinimizeButton").css("display", "none");
        $("#measureAllCH2MaximizeButton").css("display", "block");
        $("#measureAllCH2").css("width", "250px");
        $("#measureAllCH2").css("height", "39px");
    });
    $("#measureAllCH2MaximizeButton").click(function(){
        $("#measureAllCH2Body1").css("display", "block");
        $("#measureAllCH2Body2").css("display", "block");
        $("#measureAllCH2MinimizeButton").css("display", "block");
        $("#measureAllCH2MaximizeButton").css("display", "none");
        $("#measureAllCH2").css("width", "367px");
        $("#measureAllCH2").css("height", "295px");
    });
    $("#measureAllCH2CloseButton").click(function(){
        $("#measureAllCH2").css("display", "none");
    });
    $("#measureAllCH2").click(function(){
        $("#measureAllCH1").css("z-index", "4");
        $("#measureAllCH2").css("z-index", "5");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "4");
    });
    measureAllCH2dragHeader.on('mousedown', function(e){
        measureAllCH2isDragging = true;
        $("#measureAllCH1").css("z-index", "4");
        $("#measureAllCH2").css("z-index", "5");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "4");
        const currentX = parseFloat( measureAllCH2Offcanvas.css('left'));
        const currentY = parseFloat( measureAllCH2Offcanvas.css('top'));
        startX = e.pageX - currentX;
        startY = e.pageY - currentY;
        measureAllCH2Offcanvas.addClass('grabbing');
    });
    $(document).on('mousemove', function(e) {
        if (measureAllCH2isDragging) {
            const x = e.pageX - startX;
            const y = e.pageY - startY;
            measureAllCH2Offcanvas.css('left', `${x}px`);
            measureAllCH2Offcanvas.css('top', `${y}px`);
        }
    });
    $(document).on('mouseup', function() {
        measureAllCH2isDragging = false;
        measureAllCH2Offcanvas.removeClass('grabbing');
    });
//? ---------------------------------------------------------------------------------------------------------
//? F1 -> F5 events ------------------------------------------------------------------------------------
    $("#f1").click(function(){
        if(powerFlag == 1){
            if(CH1MenuFlag == 1){ //CH1 Menu On
                couplingValueCH1++;
                if(couplingValueCH1 > 2){ couplingValueCH1 = 0; }
                if(couplingValueCH1 == 0){
                    if(mode == "simulation"){
                        $("#menu-text1").text("AC");
                        $("#ch1-dc, #ch1-gnd").css("opacity", 0);
                        $("#ch1-ac").css("opacity", 1);
                    }
                    else if(mode == "acquisition") { sendPostRequest("/CH1/coupling", 0); }
                }
                else if(couplingValueCH1 == 1){
                    if(mode == "simulation"){
                        $("#menu-text1").text("GND");
                        $("#ch1-ac, #ch1-dc").css("opacity", 0);
                        $("#ch1-gnd").css("opacity", 1);
                    }
                    else if (mode == "acquisition") { sendPostRequest("/CH1/coupling", 2); }
                }
                else if(couplingValueCH1 == 2){
                    if(mode == "simulation"){
                        $("#menu-text1").text("DC");
                        $("#ch1-ac, #ch1-gnd").css("opacity", 0);
                        $("#ch1-dc").css("opacity", 1);
                    }
                    else if (mode == "acquisition") { sendPostRequest("/CH1/coupling", 1); }
                }
                if(CH1inputFlag == 1){ updateChart1(); }
            }
            else if(CH2MenuFlag == 1){ // CH2 Menu On
                couplingValueCH2++;
                if(couplingValueCH2 > 2){ couplingValueCH2 = 0; }
                if(couplingValueCH2 == 0){ 
                    if(mode == "simulation"){
                        $("#menu-text1").text("AC");
                        $("#ch2-dc, #ch2-gnd").css("opacity", 0);
                        $("#ch2-ac").css("opacity", 1);
                    }
                    else if(mode == "acquisition") { sendPostRequest("/CH2/coupling", 0); }
                }
                else if(couplingValueCH2 == 1){ 
                    if(mode == "simulation"){
                        $("#menu-text1").text("GND");
                        $("#ch2-ac, #ch2-dc").css("opacity", 0);
                        $("#ch2-gnd").css("opacity", 1);
                    }
                    else if (mode == "acquisition") { sendPostRequest("/CH2/coupling", 2); }
                }
                else if(couplingValueCH2 == 2){
                    if(mode == "simulation"){
                        $("#menu-text1").text("DC");
                        $("#ch2-ac, #ch2-gnd").css("opacity", 0);
                        $("#ch2-dc").css("opacity", 1);
                    }
                    else if (mode == "acquisition") { sendPostRequest("/CH2/coupling", 1); }
                }
                if(CH2inputFlag == 1){ updateChart2(); }
            }
            else if(measureFlag == 1){ // Measure Menu On
                sourceValue++;
                if(sourceValue > 1){ sourceValue = 0; }
                measureMenu1();
            }
            else if(measureFlag == 2){ // Display All Menu On
                $("#measureAllCH1").css("display", "block");
                $("#measureAllCH1").css("top", 100);
                $("#measureAllCH1").css("left", 100);
                measureAllCH1Flag = 1;
                measureAllCH1();
            }
            else if(mathMenuFlag == 1){ // Math Menu On
                mathOperationValue++;
                if(mathOperationValue > 1){ mathOperationValue = 0; }
                updateMenuMath();
            }
            else if(acquireMenuFlag == 1){ // Acquire Menu On
                sendPostRequest("/acquire/mode", 0);
            }
            else if(trigger.menu == 1){ // Trigger Menu On
                trigger.type++;
                if(trigger.type > 3){ trigger.type = 0; }
                if(mode == "simulation"){ updateTriggerMenu1(); }
                else if(mode == "acquisition"){ sendPostRequest("/trigger/type", trigger.type); }
            }
            else if(trigger.menu == 3){ // Trigger Slope / Coupling Menu On
                trigger.slope++;
                if(trigger.slope > 1){ trigger.slope = 0; }
                if(mode == "simulation"){ updateTriggerSlopeMenu(); }
            }
            else if(horizontalMenuFlag == 1){
                horizontalSweep = 0;
                $("#XY").css("display", "none");
                $("#main").css("display", "block");
                if(CH1Display == 1){ 
                    $("#myChart1").css("display", "block");
                    updateChart1();
                }
                if(CH2Display == 1){
                    $("#myChart2").css("display", "block");
                    updateChart2();
                }
                if(mathDataFlag == 1){ $("#myChart3").css("display", "block"); }
                if(mode == "acquisition"){ sendPostRequest("/timebase/sweep", 0); }
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#f1").contextmenu(function(e){
        if(powerFlag == 1){
            e.preventDefault();
            if(CH1MenuFlag == 1){ //CH1 Menu On
                couplingValueCH1--;
                if(couplingValueCH1 < 0){ couplingValueCH1 = 2; }
                if(couplingValueCH1 == 0){ 
                    if(mode == "simulation"){
                        $("#menu-text1").text("AC");
                        $("#ch1-dc, #ch1-gnd").css("opacity", 0);
                        $("#ch1-ac").css("opacity", 1);
                    }
                    else if(mode == "acquisition") { sendPostRequest("/CH1/coupling", 0); }
                }
                else if(couplingValueCH1 == 1){
                    if(mode == "simulation"){
                        $("#menu-text1").text("GND");
                        $("#ch1-ac, #ch1-dc").css("opacity", 0);
                        $("#ch1-gnd").css("opacity", 1);
                    }
                    else if(mode == "acquisition") { sendPostRequest("/CH1/coupling", 2); }
                }
                else if(couplingValueCH1 == 2){
                    if(mode == "simulation"){
                        $("#menu-text1").text("DC");
                        $("#ch1-ac, #ch1-gnd").css("opacity", 0);
                        $("#ch1-dc").css("opacity", 1);
                    }
                    else if(mode == "acquisition") { sendPostRequest("/CH1/coupling", 1); }
                }
                if(CH1inputFlag == 1){ updateChart1(); }
            }
            else if(CH2MenuFlag == 1){ // CH2 Menu On
                couplingValueCH2--;
                if(couplingValueCH2 < 0){ couplingValueCH2 = 2; }
                if(couplingValueCH2 == 0){ 
                    if(mode == "simulation"){
                        $("#menu-text1").text("AC");
                        $("#ch2-dc, #ch2-gnd").css("opacity", 0);
                        $("#ch2-ac").css("opacity", 1);
                    }
                    else if(mode == "acquisition") { sendPostRequest("/CH2/coupling", 0); }
                }
                else if(couplingValueCH2 == 1){ 
                    if(mode == "simulation"){
                        $("#menu-text1").text("GND");
                        $("#ch2-ac, #ch2-dc").css("opacity", 0);
                        $("#ch2-gnd").css("opacity", 1);
                    }
                    else if (mode == "acquisition") { sendPostRequest("/CH2/coupling", 2); }
                }
                else if(couplingValueCH2 == 2){
                    if(mode == "simulation"){
                        $("#menu-text1").text("DC");
                        $("#ch2-ac, #ch2-gnd").css("opacity", 0);
                        $("#ch2-dc").css("opacity", 1);
                    }
                    else if (mode == "acquisition") { sendPostRequest("/CH2/coupling", 1); }
                }
                if(CH2inputFlag == 1){ updateChart2(); }
            }
            else if(measureFlag == 1){ // Measure Menu On
                sourceValue--;
                if(sourceValue < 0){ sourceValue = 1; }
                measureMenu1();
            }
            else if(mathMenuFlag == 1){ // Math Menu On
                mathOperationValue--;
                if(mathOperationValue < 0){ mathOperationValue = 1; }
                updateMenuMath();
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#f2").click(function(){
    if(powerFlag == 1){
        if(CH1MenuFlag == 1){ //CH1 Menu On
            invertValueCH1++;
            if(invertValueCH1 > 1){ invertValueCH1 = 0; }
            if(invertValueCH1 == 0){
                if(mode == "simulation"){ $("#menu-text2").text("Off"); }
                else if (mode == "acquisition"){ sendPostRequest("/CH1/invert", 0); }
            }
            else if(invertValueCH1 == 1){ 
                if(mode == "simulation"){ $("#menu-text2").text("On"); }
                else if (mode == "acquisition"){ sendPostRequest("/CH1/invert", 1); }
            }
            if(CH1inputFlag == 1){ updateChart1(); }
        }
        else if(CH2MenuFlag == 1){ // CH2 Menu On
            invertValueCH2++;
            if(invertValueCH2 > 1){ invertValueCH2 = 0; }
            if(invertValueCH2 == 0){
                if(mode == "simulation"){ $("#menu-text2").text("Off"); }
                else if (mode == "acquisition"){ sendPostRequest("/CH2/invert", 0); }
            }
            else if(invertValueCH2 == 1){
                if(mode == "simulation"){ $("#menu-text2").text("On"); }
                else if (mode == "acquisition"){ sendPostRequest("/CH2/invert", 1); }
            }
            if(CH2inputFlag == 1){ updateChart2(); }
        }
        else if(measureFlag == 1){ // Measure Menu On
            voltTypeValue++;
            if(voltTypeValue > 4){ voltTypeValue = 0; }
            measureMenu1();
        }
        else if(measureFlag == 2){ // Display All Menu On
            $("#measureAllCH2").css("display", "block");
            $("#measureAllCH2").css("top", 130);
            $("#measureAllCH2").css("left", 100);
            measureAllCH2Flag = 1;
            measureAllCH2();
        }
        else if(mathMenuFlag == 1){ // Math Menu On
            mathOrderValue++;
            if(mathOrderValue > 1){ mathOrderValue = 0; }
            updateMenuMath();
        }
        else if(trigger.menu == 1){
            trigger.source++;
            console.log("trigger.source: " + trigger.source);
            if(trigger.source == 2){ // CH3 - Not available
                if(trigger.type == 0 || trigger.type == 2){ trigger.source = 4; } // EXT only in edge and pulse
                else if(trigger.type == 1){ trigger.source = 0; } // CH1 in video
            }
            else if(trigger.source == 5){ trigger.source = 0; } 
            if(mode == "simulation"){ updateTriggerMenu1(); }
            if(mode == "acquisition"){ sendPostRequest("/trigger/source", trigger.source); }
        }
        else if(acquireMenuFlag == 1){ // Acquire Menu On
            sendPostRequest("/acquire/mode", 1);
        }
    }
    else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#f2").contextmenu(function(e){
        if(powerFlag == 1){
            e.preventDefault();
            if(CH1MenuFlag == 1){ //CH1 Menu On
                invertValueCH1--;
                if(invertValueCH1 < 0){ invertValueCH1 = 1; }
                if(invertValueCH1 == 0){ 
                    if(mode == "simulation"){ $("#menu-text2").text("Off"); }
                    else if(mode == "acquisition"){ sendPostRequest("/CH1/invert", 0); }
                }
                else if(invertValueCH1 == 1){ 
                    if(mode == "simulation"){ $("#menu-text2").text("On"); }
                    else if(mode == "acquisition"){ sendPostRequest("/CH1/invert", 1); }
                }
                if(CH1inputFlag == 1){ updateChart1(); }
            }
            else if(CH2MenuFlag == 1){ // CH2 Menu On
                invertValueCH2--;
                if(invertValueCH2 < 0){ invertValueCH2 = 1; }
                if(invertValueCH2 == 0){ 
                    if(mode == "simulation"){ $("#menu-text2").text("Off"); }
                    else if (mode == "acquisition"){ sendPostRequest("/CH2/invert", 0); }
                }
                else if(invertValueCH2 == 1){
                    if(mode == "simulation"){ $("#menu-text2").text("Off"); }
                    else if (mode == "acquisition"){ sendPostRequest("/CH2/invert", 1); }
                }
                if(CH2inputFlag == 1){ updateChart2(); }
            }
            else if(measureFlag == 1){ // Measure Menu On
                voltTypeValue--;
                if(voltTypeValue < 0){ voltTypeValue = 4; }
                measureMenu1();
            }
            else if(mathMenuFlag == 1){ // Math Menu On
                mathOrderValue--;
                if(mathOrderValue < 0){ mathOrderValue = 1; }
                updateMenuMath();
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#f3").click(function(){
        if(powerFlag == 1){
            if(CH1MenuFlag == 1){ //CH1 Menu On
                probeValueCH1++;
                if(probeValueCH1 > 2){ probeValueCH1 = 0; }
                if(probeValueCH1 == 0){ 
                    if(mode == "simulation"){ $("#menu-text3").text("x1"); } 
                    else if(mode == "acquisition"){ sendPostRequest("/CH1/probe", 0); }
                }
                else if(probeValueCH1 == 1){ 
                    if(mode == "simulation"){ $("#menu-text3").text("x10"); }
                    else if(mode == "acquisition"){ sendPostRequest("/CH1/probe", 1); }
                }
                else if(probeValueCH1 == 2){ 
                    if(mode == "simulation"){ $("#menu-text3").text("x100"); }
                    else if(mode == "acquisition"){ sendPostRequest("/CH1/probe", 2); }
                }
                if(CH1inputFlag == 1){ updateChart1(); }
                verticalScaleCH1();
            }
            else if(CH2MenuFlag == 1){ // CH2 Menu On
                probeValueCH2++;
                if(probeValueCH2 > 2){ probeValueCH2 = 0; }
                if(probeValueCH2 == 0){ 
                    if(mode == "simulation"){ $("#menu-text3").text("x1"); }
                    else if(mode == "acquisition"){ sendPostRequest("/CH2/probe", 0); }
                }
                else if(probeValueCH2 == 1){ 
                    if(mode == "simulation"){ $("#menu-text3").text("x10"); }
                    else if(mode == "acquisition"){ sendPostRequest("/CH2/probe", 1); }
                }
                else if(probeValueCH2 == 2){ 
                    if(mode == "simulation"){ $("#menu-text3").text("x100"); }
                    else if(mode == "acquisition"){ sendPostRequest("/CH2/probe", 2); }
                }
                if(CH2inputFlag == 1){ updateChart2(); }
                verticalScaleCH2();
            }
            else if(measureFlag == 1){ // Measure Menu On
                timeTypeValue++;
                if(timeTypeValue > 1){ timeTypeValue = 0; }
                measureMenu1();
            }
            else if(trigger.menu == 1){ // Trigger Menu On
                
            }
            else if(acquireMenuFlag == 1){ // Acquire Menu On
                if(acquireModeValue != 2){ sendPostRequest("/acquire/mode", 2); }
                else{
                    acquireAverageValue++;
                    if(acquireAverageValue > 8){ acquireAverageValue = 1; }
                    sendPostRequest("/acquire/average", acquireAverageValue);
                }
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#f5").click(function(){
        if(powerFlag == 1){
            if(trigger.menu == 1){
                trigger.menu = 3;
                updateTriggerSlopeMenu();
            }
            else if(trigger.menu == 3){
                trigger.menu = 1;
                updateTriggerMenu1();
            }
            else if(horizontalMenuFlag == 1){
                if(mode == "simulation"){
                    if(CH1inputFlag == 1 && CH2inputFlag == 1){
                        horizontalSweep = 4;
                        $("#main").css("display", "none");
                        $("#XY").css("display", "block");
                        $("#myChart1").css("display", "block");
                        $("#myChart2").css("display", "none");
                        $("#myChart3").css("display", "none");
                        updateChartXY();
                    }
                    else{ alert("Both channels must be on to use XY mode."); }
                }
                else if(mode == "acquisition"){ sendPostRequest("/timebase/sweep", 4); }
                // TODO - Modo XY do osciloscópio não envia forma de onda
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
// ---------------------------------------------------------------------------------------------------------
//? Hardcopy Offcanvas events -------------------------------------------------------------------------------
    $("#hardcopyCloseButton").click(function(){
        turnOffOffcanvas();
    });
    $("#fullscreenImg").click(function(){
        turnOffOffcanvas();
        hardcopyFullscreenIMG();
    });
    $("#waveformImg").click(function(){
        turnOffOffcanvas();
        hardcopyWaveformIMG();
    });
    $("#displayAllCH1Img").click(function(){
        turnOffOffcanvas();
        hardcopyDisplayAllCH1();
    });
    $("#displayAllCH2Img").click(function(){
        turnOffOffcanvas();
        hardcopyDisplayAllCH2();
    });
    $("#waveformCH1CSV").click(function(){
        // Acquisition mode is selected and it turns on the oscilloscope
        turnOffOffcanvas();
        hardcopyWaveformCSV(CH1Data, "waveformCH1.csv");
    });
    $("#waveformCH2CSV").click(function(){
        // Acquisition mode is selected and it turns on the oscilloscope
        turnOffOffcanvas();
        hardcopyWaveformCSV(CH2Data, "waveformCH2.csv");
    });
//? --------------------------------------------------------------------------------------------------------- 
//? Signal Generator offcanvas events -----------------------------------------------------------------------
    $("#signalGenMinimizeButtonCH1").click(function(){
        $("#signalGeneratorBodyCH1").css("display", "none");
        $("#signalGenMinimizeButtonCH1").css("display", "none");
        $("#signalGenMaximizeButtonCH1").css("display", "block");
        $("#signalGeneratorOffcanvasCH1").css("height", "39px");
        $("#signalGeneratorOffcanvasCH1").css("width", "400px");
    });
    $("#signalGenMaximizeButtonCH1").click(function(){
        $("#signalGeneratorBodyCH1").css("display", "block");
        $("#signalGenMinimizeButtonCH1").css("display", "block");
        $("#signalGenMaximizeButtonCH1").css("display", "none");
        $("#signalGeneratorOffcanvasCH1").css("height", "385px");
        $("#signalGeneratorOffcanvasCH1").css("width", "1060px");
    });
    $("#signalGenCloseButtonCH1").click(function(){
        turnOffOffcanvas(1);
    });
    $("#signalGeneratorOffcanvasCH1").click(function(){
        $("#measureAllCH1").css("z-index", "4");
        $("#measureAllCH2").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "5");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "4");
    });
    signalGeneratorDragHeaderCH1.on('mousedown', function(e){
        signalGeneratorCH1isDragging = true;
        $("#measureAllCH1").css("z-index", "4");
        $("#measureAllCH2").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "5");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "4");
        const currentX = parseFloat(signalGeneratorOffcanvasCH1.css('left'));
        const currentY = parseFloat(signalGeneratorOffcanvasCH1.css('top'));
        startX = e.pageX - currentX;
        startY = e.pageY - currentY;
        signalGeneratorOffcanvasCH1.addClass('grabbing');
    });
    $(document).on('mousemove', function(e) {
        if (signalGeneratorCH1isDragging) {
            const x = e.pageX - startX;
            const y = e.pageY - startY;
            signalGeneratorOffcanvasCH1.css('left', `${x}px`);
            signalGeneratorOffcanvasCH1.css('top', `${y}px`);
        }
    });
    $(document).on('mouseup', function() {
        signalGeneratorCH1isDragging = false;
        signalGeneratorOffcanvasCH1.removeClass('grabbing');
    });

    $("#signalGenMinimizeButtonCH2").click(function(){
        $("#signalGeneratorBodyCH2").css("display", "none");
        $("#signalGenMinimizeButtonCH2").css("display", "none");
        $("#signalGenMaximizeButtonCH2").css("display", "block");
        $("#signalGeneratorOffcanvasCH2").css("height", "39px");
        $("#signalGeneratorOffcanvasCH2").css("width", "400px");
    });
    $("#signalGenMaximizeButtonCH2").click(function(){
        $("#signalGeneratorBodyCH2").css("display", "block");
        $("#signalGenMinimizeButtonCH2").css("display", "block");
        $("#signalGenMaximizeButtonCH2").css("display", "none");
        $("#signalGeneratorOffcanvasCH2").css("height", "385px");
        $("#signalGeneratorOffcanvasCH2").css("width", "1060px");
    });
    $("#signalGenCloseButtonCH2").click(function(){
        turnOffOffcanvas(2);
    });
    $("#signalGeneratorOffcanvasCH2").click(function(){
        $("#measureAllCH1").css("z-index", "4");
        $("#measureAllCH2").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "5");
    });
    signalGeneratorDragHeaderCH2.on('mousedown', function(e){
        signalGeneratorCH2isDragging = true;
        $("#measureAllCH1").css("z-index", "4");
        $("#measureAllCH2").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH1").css("z-index", "4");
        $("#signalGeneratorOffcanvasCH2").css("z-index", "5");
        const currentX = parseFloat(signalGeneratorOffcanvasCH2.css('left'));
        const currentY = parseFloat(signalGeneratorOffcanvasCH2.css('top'));
        startX = e.pageX - currentX;
        startY = e.pageY - currentY;
        signalGeneratorOffcanvasCH2.addClass('grabbing');
    });
    $(document).on('mousemove', function(e) {
        if (signalGeneratorCH2isDragging) {
            const x = e.pageX - startX;
            const y = e.pageY - startY;
            signalGeneratorOffcanvasCH2.css('left', `${x}px`);
            signalGeneratorOffcanvasCH2.css('top', `${y}px`);
        }
    });
    $(document).on('mouseup', function() {
        signalGeneratorCH2isDragging = false;
        signalGeneratorOffcanvasCH2.removeClass('grabbing');
    });
//? ---------------------------------------------------------------------------------------------------------
//? Signal Generator events ---------------------------------------------------------------------------------
    $("#sineWaveCH1").click(function(){
        sineWaveCH1();
    });
    $("#sineWaveCH2").click(function(){
        sineWaveCH2();
    });
    $("#squareWaveCH1").click(function(){
        squareWaveCH1();
    });
    $("#squareWaveCH2").click(function(){
        squareWaveCH2();
    });
    $("#triangleWaveCH1").click(function(){
        triangularWaveCH1();
    });
    $("#triangleWaveCH2").click(function(){
        triangularWaveCH2();
    });
    $("#frequencyCH1").click(function(){
        frequencyValueCH1 += 0.01;
        frequencySignalCH1();
    });
    $("#frequencyCH1").contextmenu(function(e){
        e.preventDefault();
        frequencyValueCH1 -= 0.01;
        frequencySignalCH1();
    });
    $("#frequencyCH1").on("wheel", function(e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
            frequencyValueCH1 += 0.05;
            frequencySignalCH1();
        }
        else if (e.originalEvent.deltaY > 0) {
            frequencyValueCH1 -= 0.05;
            frequencySignalCH1();
        }
    });
    $("#frequencyCH1").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#frequencyCH1").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    $("#frequencyCH2").click(function(){
        frequencyValueCH2 += 0.01;
        frequencySignalCH2();
    });
    $("#frequencyCH2").contextmenu(function(e){
        e.preventDefault();
        frequencyValueCH2 -= 0.01;
        frequencySignalCH2();
    });
    $("#frequencyCH2").on("wheel", function(e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
            frequencyValueCH2 += 0.05;
            frequencySignalCH2();
        }
        else if (e.originalEvent.deltaY > 0) {
            frequencyValueCH2 -= 0.05;
            frequencySignalCH2();
        }
    });
    $("#frequencyCH2").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#frequencyCH2").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    $("#1HzFreqCH1").click(function(){
        frequencypowerCH1 = 1;
        frequencySignalCH1();
    });
    $("#1HzFreqCH2").click(function(){
        frequencypowerCH2 = 1;
        frequencySignalCH2();
    });
    $("#10HzFreqCH1").click(function(){
        frequencypowerCH1 = 10;
        frequencySignalCH1();
    });
    $("#10HzFreqCH2").click(function(){
        frequencypowerCH2 = 10;
        frequencySignalCH2();
    });
    $("#100HzFreqCH1").click(function(){
        frequencypowerCH1 = 100;
        frequencySignalCH1();
    });
    $("#100HzFreqCH2").click(function(){
        frequencypowerCH2 = 100;
        frequencySignalCH2();
    });
    $("#1KHzFreqCH1").click(function(){
        frequencypowerCH1 = 1000;
        frequencySignalCH1();
    });
    $("#1KHzFreqCH2").click(function(){
        frequencypowerCH2 = 1000;
        frequencySignalCH2();
    });
    $("#10KHzFreqCH1").click(function(){
        frequencypowerCH1 = 10000;
        frequencySignalCH1();
    });
    $("#10KHzFreqCH2").click(function(){
        frequencypowerCH2 = 10000;
        frequencySignalCH2();
    });
    $("#100KHzFreqCH1").click(function(){
        frequencypowerCH1 = 100000;
        frequencySignalCH1();
    });
    $("#100KHzFreqCH2").click(function(){
        frequencypowerCH2 = 100000;
        frequencySignalCH2();
    });
    $("#1MHzFreqCH1").click(function(){
        frequencypowerCH1 = 1000000;
        frequencySignalCH1();
    });
    $("#1MHzFreqCH2").click(function(){
        frequencypowerCH2 = 1000000;
        frequencySignalCH2();
    });
    $("#signalAmplitudeCH1").click(function(){
        amplitudeValueCH1 += 0.01;
        amplitudeSignalCH1();
    });
    $("#signalAmplitudeCH1").contextmenu(function(e){
        e.preventDefault();
        amplitudeValueCH1 -= 0.01;
        amplitudeSignalCH1();
    });
    $("#signalAmplitudeCH1").on("wheel", function(e) {
        if (e.originalEvent.deltaY < 0) {
            amplitudeValueCH1 += 0.05;
            amplitudeSignalCH1();
        }
        else if (e.originalEvent.deltaY > 0) {
            amplitudeValueCH1 -= 0.05;
            amplitudeSignalCH1();
        }
    });
    $("#signalAmplitudeCH1").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#signalAmplitudeCH1").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    $("#signalAmplitudeCH2").click(function(){
        amplitudeValueCH2 += 0.01;
        amplitudeSignalCH2();
    });
    $("#signalAmplitudeCH2").contextmenu(function(e){
        e.preventDefault();
        amplitudeValueCH2 -= 0.01;
        amplitudeSignalCH2();
    });
    $("#signalAmplitudeCH2").on("wheel", function(e) {
        if (e.originalEvent.deltaY < 0) {
            amplitudeValueCH2 += 0.05;
            amplitudeSignalCH2();
        }
        else if (e.originalEvent.deltaY > 0) {
            amplitudeValueCH2 -= 0.05;
            amplitudeSignalCH2();
        }
    });
    $("#signalAmplitudeCH2").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#signalAmplitudeCH2").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    $("#signalOffsetCH1").click(function(){
        offsetValueCH1 += 0.01;
        offsetSignalCH1();
    });
    $("#signalOffsetCH1").contextmenu(function(e){
        e.preventDefault();
        offsetValueCH1 -= 0.01;
        offsetSignalCH1();
    });
    $("#signalOffsetCH1").on("wheel", function(e) {
        if (e.originalEvent.deltaY < 0) {
            offsetValueCH1 += 0.05;
            offsetSignalCH1();
        }
        else if (e.originalEvent.deltaY > 0) {
            offsetValueCH1 -= 0.05;
            offsetSignalCH1();
        }
    });
    $("#signalOffsetCH1").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#signalOffsetCH1").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    $("#signalOffsetCH2").click(function(){
        offsetValueCH2 += 0.01;
        offsetSignalCH2();
    });
    $("#signalOffsetCH2").contextmenu(function(e){
        e.preventDefault();
        offsetValueCH2 -= 0.01;
        offsetSignalCH2();
    });
    $("#signalOffsetCH2").on("wheel", function(e) {
        if (e.originalEvent.deltaY < 0) {
            offsetValueCH2 += 0.05;
            offsetSignalCH2();
        }
        else if (e.originalEvent.deltaY > 0) {
            offsetValueCH2 -= 0.05;
            offsetSignalCH2();
        }
    });
    $("#signalOffsetCH2").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#signalOffsetCH2").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    $("#signalGeneratorPowerCH1").click(function(){
        inputCH1();
        turnOffOffcanvas(1);
    });
    $("#signalGeneratorPowerCH2").click(function(){
        turnOffOffcanvas(2);
    });
        
//? ---------------------------------------------------------------------------------------------------------
    // #math events ------------------------------------------------------------------------------------
    // #horizontal Menu events ------------------------------------------------------------------------------------
    // #variable events ------------------------------------------------------------------------------------
//? #verticalScales event -----------------------------------------------------------------------------------
    $("#verticalScaleCH1").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        else if(powerFlag == 1){
            // Increments the vertical scale of channel 1
            if(CH1Display == 1){
                verticalScaleValueCH1++;
                verticalScaleCH1();
            }
            else{
                //alert("Channel 1 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalScaleCH1").contextmenu(function(e){
        if(powerFlag == 1){
            // Decrements the vertical scale of channel 1
            if(CH1Display == 1){
                e.preventDefault();
                verticalScaleValueCH1--;
                verticalScaleCH1();
            }
            else{
                //alert("Channel 1 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalScaleCH1").on("wheel", function(e) {
        if(powerFlag == 1){
            // Increments the vertical scale of channel 1 when scrolling up
            if (e.originalEvent.deltaY < 0) {
                if(CH1Display == 1){
                    verticalScaleValueCH1++;
                    verticalScaleCH1();
                }
            }
            // Decrements the vertical scale of channel 1 when scrolling down
            else if (e.originalEvent.deltaY > 0) {
                if (CH1Display == 1) {
                    verticalScaleValueCH1--;
                    verticalScaleCH1();
                }
            }
        }
    });
    //When the mouse enters the vertical scale of channel 1, the body becomes unscrollable, needed for the mousewheel event
    $("#verticalScaleCH1").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#verticalScaleCH1").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
    //--------------------------------------------------------------------------------------------------------------------------------
    $("#verticalScaleCH2").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        else if(powerFlag == 1){
            // Increments the vertical scale of channel 2
            if(CH2Display == 1){
                verticalScaleValueCH2++;
                verticalScaleCH2();
            }
            else{
                //alert("Channel 2 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalScaleCH2").contextmenu(function(e){
        if(powerFlag == 1){
            // Decrements the vertical scale of channel 2
            if(CH2Display == 1){
                e.preventDefault();
                verticalScaleValueCH2--;
                verticalScaleCH2();
            }
            else{
                //alert("Channel 2 is off!"); //Modificar o alert para ser algo mais apresentável *******************************************
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#verticalScaleCH2").on("wheel", function(e) {
        if(powerFlag == 1){
            // Increments the vertical scale of channel 2 when scrolling up
            if (e.originalEvent.deltaY < 0) {
                if(CH2Display == 1){
                    verticalScaleValueCH2++;
                    verticalScaleCH2();
                }
            }
            // Decrements the vertical scale of channel 2 when scrolling down
            else if (e.originalEvent.deltaY > 0) {
                if(CH2Display == 1){
                    verticalScaleValueCH2--;
                    verticalScaleCH2();
                }
            }
        }
    });
    //When the mouse enters the vertical scale of channel 2, the body becomes unscrollable, needed for the mousewheel event
    $("#verticalScaleCH2").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#verticalScaleCH2").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
//?----------------------------------------------------------------------------------------------------------
//? #horizontalScale event ----------------------------------------------------------------------------------
    $("#horizontalScale").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        // Increments the horizontal scale
        else if(powerFlag == 1){
            if(horizontalSweep == 0){
                horizontalScaleValue++;
                horizontalScale();
            }
            else if(horizontalSweep == 4){
                $("#alertMessage").css("display", "block");
                $("#alertMessage").text("Not support under this mode");
                if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                timeoutId = setTimeout(() => { 
                    $("#alertMessage").css("display", "none"); 
                }, 2000); // After 2 seconds, the alert message disappears
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#horizontalScale").contextmenu(function(e){
        // Decrements the horizontal scale
        if(powerFlag == 1){
            e.preventDefault();
            if(horizontalSweep == 0){
                horizontalScaleValue--;
                horizontalScale();
            }
            else if(horizontalSweep == 4){
                $("#alertMessage").css("display", "block");
                $("#alertMessage").text("Not support under this mode");
                if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                timeoutId = setTimeout(() => { 
                    $("#alertMessage").css("display", "none"); 
                }, 2000); // After 2 seconds, the alert message disappears
            }
        }
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#horizontalScale").on("wheel", function(e) {
        if(powerFlag == 1){
            // Increments the horizontal scale when scrolling up
            if (e.originalEvent.deltaY < 0) {
                if(horizontalSweep == 0){
                    horizontalScaleValue++;
                    horizontalScale();
                }
                else if(horizontalSweep == 4){
                    $("#alertMessage").css("display", "block");
                    $("#alertMessage").text("Not support under this mode");
                    if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                    timeoutId = setTimeout(() => { 
                        $("#alertMessage").css("display", "none"); 
                    }, 2000); // After 2 seconds, the alert message disappears
                }
            }
            // Decrements the horizontal scale when scrolling down
            else if (e.originalEvent.deltaY > 0) {
                if(horizontalSweep == 0){
                    horizontalScaleValue--;
                    horizontalScale();
                }
                else if(horizontalSweep == 4){
                    $("#alertMessage").css("display", "block");
                    $("#alertMessage").text("Not support under this mode");
                    if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
                    timeoutId = setTimeout(() => { 
                        $("#alertMessage").css("display", "none"); 
                    }, 2000); // After 2 seconds, the alert message disappears
                }
            }
        }
    });
    //When the mouse enters the horizontal scale, the body becomes unscrollable, needed for the mousewheel event
    //TODO - Simplificar todos os mouseenter para ficarem num só
    $("#horizontalScale").mouseenter(function(){
        $("body").addClass("no-scroll");
    });
    $("#horizontalScale").mouseleave(function(){
        $("body").removeClass("no-scroll");
    });
//?----------------------------------------------------------------------------------------------------------
//? CH1 and CH2 Menus: ----------------------------------------------------------------------------------------
    $("#ch1-button").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        else if(powerFlag == 1){menuCH1();}
        else{ checkAndAlertOscilloscopeStatus(); }
    });
    $("#ch2-button").click(function(){
        if(offCanvas == 1){ turnOffOffcanvas();}
        else if(powerFlag == 1){menuCH2();}
        else{ checkAndAlertOscilloscopeStatus(); }
    });
//? ---------------------------------------------------------------------------------------------------------- 
});