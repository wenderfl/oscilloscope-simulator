const verticalScaleList = ["2.000E-3", "5.000E-3", "1.000E-2", "2.000E-2", "5.000E-2", "1.000E-1", "2.000E-1", "5.000E-1", "1.000E+0", "2.000E+0", "5.000E+0"];
const horizontalScaleList = ["1.000E-9", "2.500E-9", "5.000E-9", "1.000E-8", "2.500E-8", "5.000E-8", "1.000E-7", "2.500E-7", "5.000E-7", "1.000E-6", "2.500E-6", "5.000E-6", "1.000E-5", "2.500E-5", "5.000E-5", "1.000E-4", "2.500E-4", "5.000E-4", "1.000E-3", "2.500E-3", "5.000E-3", "1.000E-2", "2.500E-2", "5.000E-2", "1.000E-1", "2.500E-1", "5.000E-1", "1.000E+0", "2.500E+0", "5.000E+0", "1.000E+1"];
//TODO - Variáveis globais que sejam usadas em ambos os modos e com os mesmos valores, perceber como atribuir o mesmo valor a duas variáveis de forma mais simples
//TODO - Nos css adaptar os valores que dependam umas das outras para serem todos uma só variável

// TODO - Modificar as variáveis para objetos por exemplo as relacionadas com o measure todas numa classe. Assim é mais fácil de perceber o que é que cada uma faz.
// TODO - Simplificar as variáveis globais, neste momento tenho muitas...

var powerFlag = 0;
var numPeriods = 100;
var mode = null;
var intervalRefData = 0;
var intervalRefCH1 = 0;
var intervalRefCH2 = 0;
var intervalRefWaves = 0;
var svg1, svg2, svg3;
var verticalScaleValueCH1 = 6;
var verticalScaleCH1_Value = 0.2;
var verticalScaleCH1_Value_Real = 0;
var verticalPositionValueCH1 = 0;
var verticalScaleValueCH2 = 6;
var verticalScaleCH2_Value = 0.2;
var verticalScaleCH2_Value_Real = 0;
var verticalPositionValueCH2 = 0;
var horizontalScaleValue = 15;
var horizontalScale_Value = 0;
var horizontalPositionValue = 0;
var CH1Display = 0;
var CH2Display = 0;
var CH1MenuFlag = 0;
var mathMenuFlag = 0;
var mathOperationValue = 0;
var mathOrderValue = 0;
var mathDataFlag = 0;
var couplingValueCH1 = 0;
var couplingValueCH2 = 0;
var invertValueCH1 = 0;
var invertValueCH2 = 0;
var probeValueCH1 = 0;
var probeValueCH2 = 0;
var CH2MenuFlag = 0;
var measureFlag = 0;
var measureAllCH1Flag = 0;
var measureAllCH2Flag = 0;
var sourceValue = 0;
var voltTypeValue = 0;
var timeTypeValue = 0;
var intervalCH1flag = 0;
var intervalCH2flag = 0;
var amplitudeCH1_Value = 1;
var amplitudeCH2_Value = 1;
const trigger = {
    menu: 0,
    type: 0,
    source: 0,
    level: 0,
    slope: 0,
    coupling: 0,
    mode: 0,
    standard: 0,
    polarity: 0,
    rejection: 0,
    noiseRej: 0,
}
var triggerLevelValue = 0;
var triggerLevelVolt = 0;
var triggerSlopeValue = 0;
var triggerLevelPosition = 0;
var triggerTypeValue = 0;
var triggerSourceValue = 0;
var timeTraveledCH1 = 0;
var distanceTraveledCH1 = 0;
var timeTraveledCH2 = 0;
var distanceTraveledCH2 = 0;
var vMaxCH1 = 0;
var vMaxCH2 = 0;
var vMinCH1 = 0;
var vMinCH2 = 0;
var vRmsCH1 = 0;
var vRmsCH2 = 0;
var vAvgCH1 = 0;
var vAvgCH2 = 0;
var vppCH1 = 0;
var vppCH2 = 0;
var vampCH1 = 0;
var vampCH2 = 0;
var timeCH1 = 0;
var freqCH1 = 0;
var timeCH2 = 0;
var freqCH2 = 0;
var frequencyCH1 = 0;
var frequencyCH2 = 0;
var periodCH1 = 0;
var periodCH2 = 0;
var offCanvas = 0;
var timeoutId = 0;
var timeIntervalCH1 = 0;
var timeIntervalCH2 = 0;
var runStopValue = 0;
var acquireMenuFlag = 0;
var acquireModeValue = 0;
var acquireAverageValue = 0;
var acquireMemLengValue = 0;
var horizontalMenuFlag = 0;
var csvData = [];
var dcSignal = [];
var CH1Data = [];
var CH1BaseData = [];
var CH2Data = [];
var CH2BaseData = [];
var mathData = [];
var dir = [];
var val = [];
var wave = [];
var time = [];
for(i=0; i<250; i++){
    time[i] = i;
}
//TODO - Adaptar para ter as funções que existem em ambos os modos e ter um if para cada modo
//? Global functions
function hexToValue(hexString) {
    let buffer = new ArrayBuffer(4);
    let dataView = new DataView(buffer);

    dataView.setUint8(0, hexString[3]);
    dataView.setUint8(1, hexString[2]);
    dataView.setUint8(2, hexString[1]);
    dataView.setUint8(3, hexString[0]);

    let floatValue = dataView.getFloat32(0, true); // The second parameter (true) is for little endian

    return floatValue.toExponential(3);
}
function updateChartReal(channel, val, dir) {
    if (channel == 1) {
        for(let i=125; i<375; i++){
            if(dir[i] == 0){ wave[i-125] = val[i]; }
            else if(dir[i] == 255){ wave[i-125] = val[i] - 255; }
        }
        let value = verticalScaleCH1_Value_Real*4;
        for(let i=0; i<250; i++){ wave[i] = (wave[i] * value)/102.4; } // 128 is the value used for 5 divs so 102.4 is the value for 4 divs
        CH1BaseData = [];
        let timeCH1 = [];
        for(let i=0; i<250; i++){ timeCH1[i] = time[i] * timeIntervalCH1; }
        CH1BaseData[0] = ["Time", "Amplitude"];
        for (let i = 1; i <= wave.length; i++){ CH1BaseData.push([timeCH1[i], wave[i]]); }
        CH1Data = [];
        const keys = CH1BaseData[0];
        for (let i = 1; i < CH1BaseData.length-1; i++) {
            const values = CH1BaseData[i];
            const object = {};
            keys.forEach((key, index) => { object[key] = values[index]; });
            CH1Data.push(object);
        }
        if(CH1Display == 1){ $("#myChart1").css("opacity", 1); }
        else if(CH1Display == 0){ $("#myChart1").css("opacity", 0); }
        showGraph1Real(CH1Data);
    }
    if (channel == 2) {
        for(let i=125; i<375; i++){
            if(dir[i] == 0){ wave[i-125] = val[i]; }
            else if(dir[i] == 255){ wave[i-125] = val[i] - 255; }
        }
        let value = verticalScaleCH2_Value_Real*4;
        for(let i=0; i<250; i++){ wave[i] = (wave[i] * value)/102.4; } // 128 is the value used for 5 divs so 102.4 is the value for 4 divs
        CH2BaseData = [];
        let timeCH2 = [];
        for(let i=0; i<250; i++){ timeCH2[i] = time[i] * timeIntervalCH2; }
        CH2BaseData[0] = ["x", "y"];
        for (let i = 1; i <= wave.length; i++) { CH2BaseData.push([timeCH2[i], wave[i]]); }
        CH2Data = [];
        const keys = CH2BaseData[0];
        for (let i = 1; i < CH2BaseData.length-1; i++) {
            const values = CH2BaseData[i];
            const object = {};
            keys.forEach((key, index) => { object[key] = values[index]; });
            CH2Data.push(object);
        }
        if(CH2Display == 1){ $("#myChart2").css("opacity", 1); }
        else if(CH2Display == 0){ $("#myChart2").css("opacity", 0); }
        showGraph2Real(CH2Data);
    }
}
function askData(data){
    if(data == "CH1"){ sendGetRequest("/CH1Data"); }
    else if(data == "CH2"){ sendGetRequest("/CH2Data"); }
    else if(data == "measure"){ sendGetRequest("/measureData"); }
    else{ sendGetRequest("/data"); }
}
function waveform1(){
    sendGetRequest("/acq/mem1");
}
function waveform2(){
    sendGetRequest("/acq/mem2");
}
function waves(){
    // TODO - Definir um intervalo de tempo que tenha em conta o tamanho do pedido e canais ligados.
    //let intervalTime = (verticalDisplayCH1 * 2000) + (verticalDisplayCH2 * 2000);
    if(CH1Display == 1 && intervalCH1flag == 0){
        intervalRefCH1 = setInterval(waveform1, 1000); // Valor 1 segundo quando apenas 1 canal estiver ligado 2 segundos para 2 canais. 500ms é muito bom
        document.getElementById('myChart1').style.display = "block";
        intervalCH1flag = 1;
    }
    if(CH1Display == 0 && intervalCH1flag == 1){
        clearInterval(intervalRefCH1);
        document.getElementById('myChart1').style.display = "none";
        intervalCH1flag = 0;
    }
    if(CH2Display == 1 && intervalCH2flag == 0){
        intervalRefCH2 = setInterval(waveform2, 1000); // Valor 1 segundo quando apenas 1 canal estiver ligado 2 segundos para 2 canais
        document.getElementById('myChart2').style.display = "block";
        intervalCH2flag = 1;
    }
    if(CH2Display == 0 && intervalCH2flag == 1){
        clearInterval(intervalRefCH2);
        document.getElementById('myChart2').style.display = "none";
        intervalCH2flag = 0;
    }
}
function sendPostRequest(URL, value) {
    $.ajax({
        url: URL,
        data: JSON.stringify({
            data: value
        }),  
        method: 'POST',
        contentType: 'application/json',
        timeout: 5000,
        success: function(response) {
            handleResponse(response);
        },
        error: function(error) {
            alert("Error! " + error.status + " - " + error.statusText);
        }
    });
}
function sendGetRequest(URL) {
    $.ajax({
        url: URL,  
        method: 'GET',
        contentType: 'application/json',
        timeout: 5000,
        success: function(response) {
            handleResponse(response);
        },
        error: function(error) {
            alert("Error! " + error.status + " - " + error.statusText);
        }
    });
}
function toggleInterface() { // Toggle interface on/off, used with the power button
    if($('.interface').css('opacity') == 0) {$('.interface').css('opacity', 1);}
    else {$('.interface').css('opacity', 0);}
}
function decreaseOpacity() { // Decrease opacity and changes the cursors when offcanvas is open
    $("#oscilloscope").css("opacity", "0.6");
    if($(".interface").css("opacity") == 1) { $(".interface").css("opacity", "0.6");}
    if($("#ch1-button").css("opacity") == 1) { $("#ch1-button").css("opacity", "0.6"); }
    if($("#ch2-button").css("opacity") == 1) { $("#ch2-button").css("opacity", "0.6"); }
    if($("#CH1Input").css("opacity") == 1) { $("#CH1Input").css("opacity", "0.6"); }
    if($("#CH2Input").css("opacity") == 1) { $("#CH2Input").css("opacity", "0.6"); }
    $(document.body).css("cursor", "not-allowed");
    $("area").css("cursor", "not-allowed");
    $("#ch1-button, #ch2-button").css("cursor", "not-allowed");
    $("#CH1Input, #CH2Input").css("cursor", "not-allowed");
}
function turnOffOffcanvas(signalGenerator) {
    $("#modeOffcanvas, #inputOffcanvas-ch1, #inputOffcanvas-ch2, #hardcopyOffcanvas").css("display", "none");
    if(signalGenerator == 1){ 
        $("#signalGeneratorOffcanvasCH1").css("display", "none"); 
    }
    if(signalGenerator == 2){ $("#signalGeneratorOffcanvasCH2").css("display", "none"); }
    $("#oscilloscope").css("opacity", "1");
    if($(".interface").css("opacity") == 0.6) { $(".interface").css("opacity", "1");}
    if($("#ch1-button").css("opacity") == 0.6) { $("#ch1-button").css("opacity", "1");}
    if($("#ch2-button").css("opacity") == 0.6) { $("#ch2-button").css("opacity", "1");}
    if($("#CH1Input").css("opacity") == 0.6) { $("#CH1Input").css("opacity", "1");}
    if($("#CH2Input").css("opacity") == 0.6) { $("#CH2Input").css("opacity", "1");}
    $(document.body).css("cursor", "default");
    $("area").css("cursor", "pointer");
    $("#ch1-button, #ch2-button").css("cursor", "pointer");
    $("#CH1Input, #CH2Input").css("cursor", "pointer");
    if(mode == "simulation"){ simulatorFunctionalities(); }
    if(mode == "acquisition"){ acquisitionFunctionalities(); }
    offCanvas = 0;
}
function checkAndAlertOscilloscopeStatus() {
    if (powerFlag === 0) {
      alert("Turn on the oscilloscope first!");
    }
}
function updateScales() {
    let verticalScaleCH1_Value = verticalScaleList[verticalScaleValueCH1];
    $("#ch1-voltageScale").text(scientificNotationToReal(verticalScaleCH1_Value) + "V");
    let verticalScaleCH2_Value = verticalScaleList[verticalScaleValueCH2];
    $("#ch2-voltageScale").text(scientificNotationToReal(verticalScaleCH2_Value) + "V");
    let horizontalScale_Value = horizontalScaleList[horizontalScaleValue];
    $("#time-horizontalScale").text(scientificNotationToReal(horizontalScale_Value) + "s");
}
function resetMenuFlags() {
    CH1MenuFlag = 0;
    CH2MenuFlag = 0;
    mathMenuFlag = 0;
    measureFlag = 0;
    trigger.menu = 0;
    acquireMenuFlag = 0;
    horizontalMenuFlag = 0;
}
function updateCH1Menu(){
    clearScreen(); 
    $("#menu-title").text("CH1");
    $("#menu-textTitle1").text("Coupling");
    if(couplingValueCH1 == 0){ 
        $("#menu-text1").text("AC");
        $("#ch1-dc, #ch1-gnd").css("opacity", 0);
        $("#ch1-ac").css("opacity", 1);
    }
    else if(couplingValueCH1 == 1){
        $("#menu-text1").text("GND");
        $("#ch1-ac, #ch1-dc").css("opacity", 0);
        $("#ch1-gnd").css("opacity", 1);
    }
    else if(couplingValueCH1 == 2){
        $("#menu-text1").text("DC");
        $("#ch1-ac, #ch1-gnd").css("opacity", 0);
        $("#ch1-dc").css("opacity", 1);
    }
    $("#menu-textTitle2").text("Invert");
    if(invertValueCH1 == 0){ $("#menu-text2").text("Off") }
    else if(invertValueCH1 == 1){ $("#menu-text2").text("On"); }
    $("#menu-textTitle3").text("Probe");
    if(probeValueCH1 == 0){ $("#menu-text3").text("x1"); }
    else if(probeValueCH1 == 1){ $("#menu-text3").text("x10"); }
    else if(probeValueCH1 == 2){ $("#menu-text3").text("x100"); }
}
function updateCH2Menu(){
    clearScreen();
    resetMenuFlags();
    CH2MenuFlag = 1;
    $("#menu-title").text("CH2");
    $("#menu-textTitle1").text("Coupling");
    if(couplingValueCH2 == 0){ 
        $("#menu-text1").text("AC");
        $("#ch2-dc, #ch2-gnd").css("opacity", 0);
        $("#ch2-ac").css("opacity", 1);
    }
    else if(couplingValueCH2 == 1){ 
        $("#menu-text1").text("GND");
        $("#ch2-ac, #ch2-dc").css("opacity", 0);
        $("#ch2-gnd").css("opacity", 1); 
    }
    else if(couplingValueCH2 == 2){ 
        $("#menu-text1").text("DC");
        $("#ch2-ac, #ch2-gnd").css("opacity", 0);
        $("#ch2-dc").css("opacity", 1);
    }
    $("#menu-textTitle2").text("Invert");
    if(invertValueCH2 == 0){ $("#menu-text2").text("Off"); }
    else if(invertValueCH2 == 1){ $("#menu-text2").text("On"); }
    $("#menu-textTitle3").text("Probe");
    if(probeValueCH2 == 0){ $("#menu-text3").text("x1"); }
    else if(probeValueCH2 == 1){ $("#menu-text3").text("x10"); }
    else if(probeValueCH2 == 2){ $("#menu-text3").text("x100"); }
}
function initialization(){
    updateScales();
    updateCH1Menu();
    if(CH1Display == 1){ $("#ch1-button").css("opacity", 1); }
    if(CH2Display == 1){ $("#ch2-button").css("opacity", 1); }
    if(CH1inputFlag == 1){ $("#CH1Input").css("opacity", 1); }
    if(CH2inputFlag == 1){ $("#CH2Input").css("opacity", 1); }
    if(CH1SignalGenerator == 1 || CH2SignalGenerator == 1){ $("#signalGeneratorOffcanvas").css("opacity", 1); }
    if(trigger.type == 0){ $("#trigger-type").text("EDGE"); }
    if(trigger.source == 0){ $("#trigger-source").text("CH1").css("color", "#fbff00"); }
    else if(trigger.source == 1){ $("#trigger-source").text("CH2").css("color", "#00eaff"); }
}
function initialization2(){
    CH1MenuFlag = 1;
    updateCH1Menu();
    acquisitionFunctionalities();
    if(trigger.type == 0){ $("#trigger-type").text("EDGE"); }
    if(trigger.source == 0){ $("#trigger-source").text("CH1").css("color", "#fbff00"); }
    else if(trigger.source == 1){ $("#trigger-source").text("CH2").css("color", "#00eaff"); }
    intervalRefData = setInterval(askData, 1000); // TODO - Definir o intervalo de tempo para pedir os dados
    intervalRefWaves = setInterval(waves, 1000);
}
function power(){
    if(powerFlag == 0){
        $("#power-light").css("opacity", 1);
        if(mode == "simulation"){ initialization(); }
        if(mode == "acquisition"){ initialization2(); }
        powerFlag = 1;
    }
    else {
        clearScreen();
        $("#power-light, #ch1-button, #ch2-button, #CH1Input, #CH2Input, #signalGeneratorOffcanvas").css("opacity", 0);
        powerFlag = 0;
        clearInterval(intervalRefData);
        clearInterval(intervalRefWaves);
    }
    toggleInterface();
}
function resetMode (){ // TODO - Continuar a desenvolver na faculdade
    CH1BaseData = [];
    CH2BaseData = [];
    CH1Data = [];
    CH2Data = [];
    mathData = [];
    $("#myChart1, #myChart2, #myChart3").css("opacity", 0);
    $("#ch1-button, #ch2-button").css("opacity", 0);
    $("#CH1Input, #CH2Input").css("opacity", 0);
    $("#signalGeneratorOffcanvas").css("opacity", 0);
    verticalScaleValueCH1 = 6;
    verticalScaleCH1_Value = 0.2;
    verticalScaleCH1_Value_Real = 0;
    verticalPositionValueCH1 = 0;
    verticalScaleValueCH2 = 6;
    verticalScaleCH2_Value = 0.2;
    verticalScaleCH2_Value_Real = 0;
    verticalPositionValueCH2 = 0;
    horizontalScaleValue = 15;
    horizontalScale_Value = 0;
    horizontalPositionValue = 0;
}
function scientificNotationToReal(value){
    let valueunit = value.substring(value.length - 2, value.length);
    if(valueunit == "-9" || valueunit == "-8" || valueunit == "-7"){
        format = "n";
    }else if(valueunit == "-6" || valueunit == "-5" || valueunit == "-4"){
        format = "u";
    }else if(valueunit == "-3" || valueunit == "-2" || valueunit == "-1"){
        format = "m";
    }else if(valueunit == "+0" || valueunit == "+1" || valueunit == "+2"){
        format = "";
    }else if(valueunit == "+3" || valueunit == "+4" || valueunit == "+5"){
        format = "k";
    }else if(valueunit == "+6" || valueunit == "+7" || valueunit == "+8"){
        format = "M";
    }
    if(valueunit == "-9" || valueunit == "-6" || valueunit == "-3" || valueunit == "+0" || valueunit == "+3" || valueunit == "+6"){
        multi = 1;
    }else if(valueunit == "-8" || valueunit == "-5" || valueunit == "-2" || valueunit == "+1" || valueunit == "+4" || valueunit == "+7"){
        multi = 10;
    }else if(valueunit == "-7" || valueunit == "-4" || valueunit == "-1" || valueunit == "+2" || valueunit == "+5" || valueunit == "+8"){
        multi = 100;
    }
    value = value.substring(0, value.length - 4);
    value = value * multi;
    if (value % 1 !== 0) {
        value = value.toFixed(2);
    }
    string = value + format;
    return string;
}
function clearScreen(){//Clear interface
    $("#menu-title").text("").css({ "font-size": "19px", "top": "-5px"});
    $("#menu-textTitle1, #menu-textTitle2, #menu-textTitle3, #menu-textTitle4, #menu-textTitle5").css({ "font-size": "19px" }).text("");
    $("#menu-text1, #menu-text2, #menu-text3, #menu-text4, #menu-text5").css({ "font-size": "19px" }).text("");
    $("#menu-soloText1, #menu-soloText2, #menu-soloText3, #menu-soloText4, #menu-soloText5").css({ "font-size": "19px" , "margin-top": "0px"}).text("");
    $("#menu-valueText11, #menu-valueText12, #menu-valueText21, #menu-valueText22, #menu-valueText31, #menu-valueText32, #menu-valueText41, #menu-valueText42, #menu-valueText43, #menu-valueText44, #menu-valueText51, #menu-valueText52, #menu-valueText53").text("");
}
function showGraph1(data) {
    if(mathDataFlag == 1){ showGraph3(mathData); }
    svg1 = d3.select('#myChart1');

    const width = 368;
    const height = 295;

    const horizontalScale = horizontalScaleList[horizontalScaleValue]*10
    const verticalScale = verticalScaleList[verticalScaleValueCH1]*4
    svg1.attr('width', width).attr('height', height);

    svg1.selectAll('*').remove();

    const xScale = d3.scaleLinear()
                     .domain([0, horizontalScale])
                     .range([0, width]);
    const yScale = d3.scaleLinear()
                     .domain([-verticalScale, verticalScale])
                     .range([height, 0]);
    const line = d3.line()
                    .x((d, i) => xScale(parseFloat(d.Time) + horizontalScale * (horizontalPositionValue + 0.5)  + timeTraveledCH1 + horizontalScale * distanceTraveledCH1))
                    .y(d => yScale((d.Amplitude+ verticalScale*verticalPositionValueCH1) / (10 ** probeValueCH1)));

    let j = 0;
    let time;
    data.forEach(d => {
        j++;
        if(j == data.length){
            time = parseFloat(d.Time);
        }
    });
    const interval = time;
    for (let i = -numPeriods; i < numPeriods; i++) {
        const translatedData = data.map(d => ({ Time: parseFloat(d.Time) + i * interval, Amplitude: d.Amplitude }));
        svg1.append('path')
            .datum(translatedData)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(255, 255, 40)')
            .attr('stroke-width', 2)
            .attr('d', line);
    }
}
function showGraph1Real(data) {
    if(mathDataFlag == 1){showGraph3(mathData);}
    svg1 = d3.select('#myChart1');

    const width = 368;
    const height = 295;

    const horizontalScale = horizontalScaleList[horizontalScaleValue]*10
    const verticalScale = verticalScaleList[verticalScaleValueCH1]*4
    svg1.attr('width', width).attr('height', height);

    svg1.selectAll('*').remove();
    
    const xScale = d3.scaleLinear()
                     .domain([0, horizontalScale])
                     .range([0, width]);
    const yScale = d3.scaleLinear()
                     .domain([-verticalScale, verticalScale])
                     .range([height, 0]);
    const line = d3.line()
                    .x((d, i) => xScale(parseFloat(d.Time)))
                    .y(d => yScale((d.Amplitude+ verticalScale*verticalPositionValueCH1) / (10 ** probeValueCH1)));

    let j = 0;
    let time;
    data.forEach(d => {
        j++;
        if(j == data.length){
            time = parseFloat(d.Time);
        }
    });
    const interval = time;
    for (let i = -numPeriods; i < numPeriods; i++) {
        const translatedData = data.map(d => ({ Time: parseFloat(d.Time) + i * interval, Amplitude: d.Amplitude }));
        svg1.append('path')
            .datum(translatedData)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(255, 255, 40)')
            .attr('stroke-width', 2)
            .attr('d', line);
    }
}
function showGraph2(data) {
    if(mathDataFlag == 1){showGraph3(mathData);}
    svg2 = d3.select('#myChart2');

    const width = 368;
    const height = 295;

    const horizontalScale = horizontalScaleList[horizontalScaleValue]*10
    const verticalScale = verticalScaleList[verticalScaleValueCH2]*4
    svg2.attr('width', width).attr('height', height);

    svg2.selectAll('*').remove();

    const xScale = d3.scaleLinear()
                    .domain([0, horizontalScale])
                    .range([0, width]);
    const yScale = d3.scaleLinear()
                    .domain([-verticalScale, verticalScale])
                    .range([height, 0]);
    const line = d3.line()
                    .x((d, i) => xScale(parseFloat(d.Time) + horizontalScale * (horizontalPositionValue + 0.5)  + timeTraveledCH2  + horizontalScale * distanceTraveledCH2))
                    .y(d => yScale((d.Amplitude + verticalScale*verticalPositionValueCH2) / (10**probeValueCH2)));

    let j = 0;
    let time;
    data.forEach(d => {
        j++;
        if(j == data.length){
            time = parseFloat(d.Time);
        }
    });
    const interval = time;
    for (let i = -numPeriods; i < numPeriods; i++) {
        const translatedData = data.map(d => ({ Time: parseFloat(d.Time) + i * interval, Amplitude: d.Amplitude }));
        svg2.append('path')
            .datum(translatedData)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(0, 242, 255)')
            .attr('stroke-width', 2)
            .attr('d', line);
    }
}
function showGraph2Real(data) {
    if(mathDataFlag == 1){showGraph3(mathData);}
    svg2 = d3.select('#myChart2');

    const width = 368;
    const height = 295;

    const horizontalScale = horizontalScaleList[horizontalScaleValue]*10
    const verticalScale = verticalScaleList[verticalScaleValueCH2]*4
    svg2.attr('width', width).attr('height', height);

    svg2.selectAll('*').remove();

    const xScale = d3.scaleLinear()
                    .domain([0, horizontalScale])
                    .range([0, width]);
    const yScale = d3.scaleLinear()
                    .domain([-verticalScale, verticalScale])
                    .range([height, 0]);
    const line = d3.line()
                    .x((d, i) => xScale(parseFloat(d.Time)))
                    .y(d => yScale((d.Amplitude + verticalScale*verticalPositionValueCH2) / (10**probeValueCH2)));

    let j = 0;
    let time;
    data.forEach(d => {
        j++;
        if(j == data.length){
            time = parseFloat(d.Time);
        }
    });
    const interval = time;
    for (let i = -numPeriods; i < numPeriods; i++) {
        const translatedData = data.map(d => ({ Time: parseFloat(d.Time) + i * interval, Amplitude: d.Amplitude }));
        svg2.append('path')
            .datum(translatedData)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(0, 242, 255)')
            .attr('stroke-width', 2)
            .attr('d', line);
    }
}
function showGraph3(data) {
    svg3 = d3.select('#myChart3');

    const width = 368;
    const height = 295;

    const horizontalScale = horizontalScaleList[horizontalScaleValue]*10;
    let verticalScale;
    if(verticalScaleValueCH1 >= verticalScaleValueCH2){ verticalScale = verticalScaleList[verticalScaleValueCH1]*4; }
    else{ verticalScale = verticalScaleList[verticalScaleValueCH2]*4; }
    svg3.attr('width', width).attr('height', height);

    svg3.selectAll('*').remove();

    const xScale = d3.scaleLinear()
                    .domain([0, horizontalScale])
                    .range([0, width]);
    const yScale = d3.scaleLinear()
                    .domain([-verticalScale, verticalScale])
                    .range([height, 0]);
    const line = d3.line()
                    .x((d, i) => xScale(d.Time + horizontalScale * (horizontalPositionValue + 0.5)))
                    .y(d => yScale(d.Amplitude));

    let j = 0;
    let time;
    data.forEach(d => {
        j++;
        if(j == data.length){
            time = parseFloat(d.Time);
        }
    });
    const interval = time;
    for (let i = -numPeriods; i < numPeriods; i++) {
        const translatedData = data.map(d => ({ Time: parseFloat(d.Time) + i * interval, Amplitude: d.Amplitude }));
        svg3.append('path')
            .datum(translatedData)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(255, 0, 0)')
            .attr('stroke-width', 2)
            .attr('d', line);
    }
}
function verticalScaleCH1(){
    if(verticalScaleValueCH1 < 0){ verticalScaleValueCH1 = 0; }
    if(verticalScaleValueCH1 > 10){ verticalScaleValueCH1 = 10; }
    verticalScaleCH1_Value = verticalScaleList[verticalScaleValueCH1];
    verticalScaleCH1_Value = (verticalScaleCH1_Value * 10 ** probeValueCH1).toExponential(2);
    if(mode == "simulation"){
        let string = scientificNotationToReal(verticalScaleCH1_Value);
        $("#ch1-voltageScale").text(string + "V");
        if(CH1inputFlag == 0){ showGraph1(dcSignal); }
        else if(horizontalSweep == 0){ showGraph1(CH1Data); }
        else if(horizontalSweep == 4){ showGraphXY(XYData); }
    }
    else if(mode == "acquisition"){ sendPostRequest("/CH1/scale", verticalScaleCH1_Value); }
    if(mathMenuFlag == 1){ updateMenuMath(); }
}
function verticalScaleCH2(){
    if(verticalScaleValueCH2 < 0){ verticalScaleValueCH2 = 0; }
    if(verticalScaleValueCH2 > 10){ verticalScaleValueCH2 = 10; }
    verticalScaleCH2_Value = verticalScaleList[verticalScaleValueCH2];
    verticalScaleCH2_Value = (verticalScaleCH2_Value * 10 ** probeValueCH2).toExponential(2);
    if(mode == "simulation"){
        let string = scientificNotationToReal(verticalScaleCH2_Value);
        $("#ch2-voltageScale").text(string + "V");
        if(CH2inputFlag == 0){ showGraph2(dcSignal); }
        else if(horizontalSweep == 0){ showGraph2(CH2Data); }
        else if(horizontalSweep == 4){ showGraphXY(XYData); }
    }
    else if(mode == "acquisition"){ sendPostRequest("/CH2/scale", verticalScaleCH2_Value); }
    if(mathMenuFlag == 1){ updateMenuMath(); }
}
function horizontalScale(){
    if(horizontalScaleValue < 0){ horizontalScaleValue = 0; }
    if(horizontalScaleValue > 30){ horizontalScaleValue = 30; }
    horizontalScale_Value = horizontalScaleList[horizontalScaleValue];
    if(mode == "simulation"){
        let string = scientificNotationToReal(horizontalScale_Value);
        $("#time-horizontalScale").text(string + "s");
        showGraph1(CH1Data);
        if(CH1inputFlag == 0){ showGraph1(dcSignal); }
        showGraph2(CH2Data);
        if(CH2inputFlag == 0){ showGraph2(dcSignal); }
    }
    else if(mode == "acquisition"){ sendPostRequest("/timebase/scale", horizontalScale_Value); }
}
function verticalPositionCH1(){ // Updates the vertical position of CH1
    if(mode == "simulation"){
        // Limits the vertical position to the screen
        if(verticalPositionValueCH1 < -1){ verticalPositionValueCH1 = -1; }
        if(verticalPositionValueCH1 > 1){ verticalPositionValueCH1 = 1; }
        
        // Updates the graph with the new vertical position
        if(CH1inputFlag == 0){ showGraph1(dcSignal); }
        else if(CH1inputFlag == 1){ showGraph1(CH1Data); }

        // Display an alert message with the new position in volts
        let position = (verticalPositionValueCH1 * verticalScaleList[verticalScaleValueCH1] * 4);
        if(position > 0 && position < 10**-6 || position < 0 && position > -(10**-6)){ position = 0; }
        position = scientificNotationToReal(position.toExponential(3));
        $("#cursorCH1").css("top", -verticalPositionValueCH1*147.5+137); // Moves the cursor to the new position
        $("#alertMessage").css("display", "block");
        $("#alertMessage").text("Position(1)=" + position + "V");
        if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
        timeoutId = setTimeout(() => { 
            $("#alertMessage").css("display", "none"); 
        }, 2000); // After 2 seconds, the alert message disappears
    }
}
function verticalPositionCH2(){ // Updates the vertical position of CH2
    if(mode == "simulation"){
        // Limits the vertical position to the screen
        if(verticalPositionValueCH2 < -1){ verticalPositionValueCH2 = -1; }
        if(verticalPositionValueCH2 > 1){ verticalPositionValueCH2 = 1; }

        // Updates the graph with the new vertical position
        if(CH2inputFlag == 0){ showGraph2(dcSignal); }
        else if(CH2inputFlag == 1){ showGraph2(CH2Data); }

        // Display an alert message with the new position in volts
        let position = (verticalPositionValueCH2 * verticalScaleList[verticalScaleValueCH2] * 4);
        if(position > 0 && position < 10**-6 || position < 0 && position > -(10**-6)){ position = 0; }
        position = scientificNotationToReal(position.toExponential(3));
        $("#cursorCH2").css("top", -verticalPositionValueCH2*147.5+137); // Moves the cursor to the new position
        $("#alertMessage").css("display", "block");
        $("#alertMessage").text("Position(2)=" + position + "V");
        if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
        timeoutId = setTimeout(() => {
            $("#alertMessage").css("display", "none");
        }, 2000); // After 2 seconds, the alert message disappears
    }
}
function horizontalPosition(){
    if(mode == "simulation"){
        horizontalPositionValue = parseFloat(horizontalPositionValue.toFixed(3));
        if(horizontalPositionValue < -0.5){ horizontalPositionValue = -0.5; }
        if(horizontalPositionValue > 0.5){ horizontalPositionValue = 0.5; }
        $("#cursor-time").css("left", horizontalPositionValue*366+174);
        showGraph1(CH1Data);
        showGraph2(CH2Data);
    }
}
function menuCH1(){
    if(CH1Display == 0){ // Turn on CH1 display
        if(mode == "simulation"){
            $("#ch1-button").css("opacity", 1);
            $("#cursorCH1").css("opacity", 1);
            CH1Display = 1;
            if(timeoutId && CH1inputFlag == 1) {
                $("#alertMessage").css("display", "none");
            }
            if(CH1input == 0){ showGraph1(dcSignal); }
            $("#myChart1").css("opacity", 1);
        }
        else if(mode == "acquisition") { sendPostRequest("/CH1/display", "1"); }
        // if(CH1MenuFlag  == 0){ // CH1 Menu Related
        //     resetMenuFlags();
        //     CH1MenuFlag  = 1;
        //     clearScreen();
        //     updateCH1Menu();
        // }
    }
    if(CH1MenuFlag == 0 ){
        resetMenuFlags();
        CH1MenuFlag  = 1;
        clearScreen();
        updateCH1Menu();
    }
    else if(CH1MenuFlag == 1 && CH1Display == 1){ // Turn off CH1 display
        CH1MenuFlag = 0;
        if(mode == "simulation"){
            CH1Display = 0;
            $("#ch1-button").css("opacity", 0);
            $("#myChart1").css("opacity", 0);
            $("#cursorCH1").css("opacity", 0);
        }
        else if(mode == "acquisition") { sendPostRequest("/CH1/display", "0"); }
    }
}
function menuCH2(){
    if(CH2Display == 0){
        if(mode == "simulation"){
            $("#ch2-button").css("opacity", 1);
            $("#cursorCH2").css("opacity", 1);
            CH2Display = 1;
            if (timeoutId && CH2inputFlag == 1) {
                $("#alertMessage").css("display", "none");
            }
            if(mode == "simulation" && CH2input == 0){ showGraph2(dcSignal); }
            $("#myChart2").css("opacity", 1);
        }
        else if(mode == "acquisition") { sendPostRequest("/CH2/display", "1"); }
        // if(CH2MenuFlag == 0){
        //     resetMenuFlags();
        //     CH2MenuFlag  = 1;
        //     clearScreen();
        //     updateCH2Menu();
        // }
    }
    if(CH2MenuFlag == 0){
        resetMenuFlags();
        CH2MenuFlag  = 1;
        clearScreen();
        updateCH2Menu();
    }
    else if(CH2MenuFlag == 1 && CH2Display == 1){
        CH2MenuFlag = 0;
        if(mode == "simulation"){
            CH2Display = 0;
            $("#ch2-button").css("opacity", 0);
            $("#myChart2").css("opacity", 0);
            $("#cursorCH2").css("opacity", 0);
        }
        if(mode == "acquisition") { sendPostRequest("/CH2/display", "0"); }
    }
}
function autoSet(){
    //This function will be used to automatically set the oscilloscope to the best settings for the signal being measured
    if(mode == "simulation"){
        if(CH1Display == 1 && CH1inputFlag == 1 && CH2Display == 0){
            //TODO - Quando o acoplamento for GND ou DC deve se passar para AC
            for(const factor of verticalScaleList) {
                if (amplitudeCH1_Value / factor <= 8) {
                    verticalScaleValueCH1 = verticalScaleList.indexOf(factor);
                    couplingValueCH1 = 0;
                    updateChart1();
                    verticalScaleCH1();
                    verticalPositionValueCH1 = 0;
                    verticalPositionCH1();
                    break;
                }
            }
            for(const factor of horizontalScaleList){
                if((1/factor) / frequencyCH1_Value <= 10){
                    horizontalScaleValue = horizontalScaleList.indexOf(factor);
                    horizontalScale();
                    horizontalPositionValue = 0;
                    break;
                }
            }
        }
        else if(CH2Display == 1 && CH2inputFlag == 1 && CH1Display == 0){
            for(const factor of verticalScaleList) {
                if (amplitudeCH2_Value / factor <= 8) {
                    verticalScaleValueCH2 = verticalScaleList.indexOf(factor);
                    couplingValueCH2 = 0;
                    verticalScaleCH2();
                    verticalPositionValueCH2 = 0;
                    verticalPositionCH2();
                    break;
                }
            }
            for(const factor of horizontalScaleList){
                if((1/factor) / frequencyCH2_Value <= 10){
                    horizontalScaleValue = horizontalScaleList.indexOf(factor);
                    horizontalScale();
                    horizontalPositionValue = 0;
                    break;
                }
            }
        }
        else if(CH1Display == 1 && CH2Display == 1 && CH1inputFlag == 1 && CH2inputFlag == 1){
            for(const factor of verticalScaleList) {
                if (amplitudeCH1_Value / factor <= 4) {
                    verticalScaleValueCH1 = verticalScaleList.indexOf(factor);
                    couplingValueCH1 = 0;
                    verticalScaleCH1();
                    verticalPositionValueCH1 = 0.5;
                    verticalPositionCH1();
                    break;
                }
            }
            for(const factor of verticalScaleList) {
                if (amplitudeCH2_Value / factor <= 4) {
                    verticalScaleValueCH2 = verticalScaleList.indexOf(factor);
                    couplingValueCH2 = 0;
                    verticalScaleCH2();
                    verticalPositionValueCH2 = -0.5;
                    verticalPositionCH2();
                    break;
                }
            }
            for(const factor of horizontalScaleList){
                if((1/factor) / frequencyCH2_Value <= 10){
                    horizontalScaleValue = horizontalScaleList.indexOf(factor);
                    horizontalScale();
                    horizontalPositionValue = 0;
                    break;
                }
            }
        }
    }
    else if(mode == "acquisition"){
        sendPostRequest("/autoset");
    }
}
function hardcopyFullscreenIMG(){
    const elementToCapture = document.querySelector(".interface");
        
    html2canvas(elementToCapture).then(function(canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.setAttribute("download","interface.png");
        link.setAttribute("href", url);
        link.click();
    });
}
function hardcopyWaveformIMG(){
    const elementToCapture = document.querySelector(".waveforms");
    html2canvas(elementToCapture).then(function(canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.setAttribute("download","waveform.png");
        link.setAttribute("href", url);
        link.click();
    });
}
function hardcopyDisplayAllCH1(){
    const elementToCapture = document.querySelector(".measureAll-CH1");
        
    html2canvas(elementToCapture).then(function(canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.setAttribute("download","displayAllCH1.png");
        link.setAttribute("href", url);
        link.click();
    });
}
function hardcopyDisplayAllCH2(){
    const elementToCapture = document.querySelector(".measureAll-CH2");
        
    html2canvas(elementToCapture).then(function(canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.setAttribute("download","displayAllCH2.png");
        link.setAttribute("href", url);
        link.click();
    });
}
function hardcopyWaveformCSV(data, filename) {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
}
function measureCalculationCH1(){
    vMaxCH1 = 0;
    vMinCH1 = 0;
    vRmsCH1 = 0;
    vAvgCH1 = 0;
    vppCH1 = 0;
    timeCH1 = 0;
    freqCH1 = 0;
    frequencyCH1 = 0;
    periodCH1 = 0;
    let i = 0;
    CH1Data.forEach(d => {
        let amplitude = parseFloat(d.Amplitude);
        if(vMaxCH1 < amplitude){ vMaxCH1 = amplitude; }
        else if(vMinCH1 > amplitude){ vMinCH1 = amplitude; }
        vRmsCH1 = vRmsCH1 + Math.pow(amplitude, 2);
        vAvgCH1 = vAvgCH1 + amplitude;
        let time = parseFloat(d.Time);
        if(i==CH1Data.length-1){ 
            timeCH1 = time; 
            if(CH1ChangableWave == 0){ frequencyCH1_Value = 1/timeCH1; }
        }
        i++;
    });
    amplitudeCH1_Value = vMaxCH1-vMinCH1;
    freqCH1 = (1/timeCH1).toFixed(2);
    timeCH1 = timeCH1.toExponential(2);
    periodCH1 = scientificNotationToReal(timeCH1);
    let freqNumber = parseFloat(freqCH1);
    freqNumber = freqNumber.toExponential(3);
    frequencyCH1 = scientificNotationToReal(freqNumber);
    vRmsCH1 = Math.sqrt(vRmsCH1/CH1Data.length).toFixed(3);
    vAvgCH1 = (vAvgCH1/CH1Data.length).toFixed(2);
    vppCH1 = (vMaxCH1 - vMinCH1).toFixed(2);
    vampCH1 = (vMaxCH1 - vAvgCH1).toFixed(2);
    vMaxCH1 = vMaxCH1.toFixed(2);
    vMinCH1 = vMinCH1.toFixed(2);
}
function measureCalculationCH2(){
    vMaxCH2 = 0;
    vMinCH2 = 0;
    vRmsCH2 = 0;
    vAvgCH2 = 0;
    vppCH2 = 0;
    timeCH2 = 0;
    freqCH2 = 0;
    frequencyCH2 = 0;
    periodCH2 = 0;
    let i = 0;
    CH2Data.forEach(d => {
        let amplitude = parseFloat(d.Amplitude);
        if(CH2ChangableWave == 0){ amplitudeCH2_Value = amplitude; }
        if(vMaxCH2 < amplitude){ vMaxCH2 = amplitude; }
        else if(vMinCH2 > amplitude){ vMinCH2 = amplitude; }
        vRmsCH2 = vRmsCH2 + Math.pow(amplitude, 2);
        vAvgCH2 = vAvgCH2 + amplitude;

        let time = parseFloat(d.Time);
        if(i==CH2Data.length-1){ 
            timeCH2 = time; 
            if(CH2ChangableWave == 0){ frequencyCH2_Value = 1/timeCH2; }
        }
        i++;
    });
    amplitudeCH2_Value = vMaxCH2-vMinCH2;
    freqCH2 = (1/timeCH2).toFixed(2);
    timeCH2 = timeCH2.toExponential(2);
    periodCH2 = scientificNotationToReal(timeCH2);
    let freqNumber = parseFloat(freqCH2);
    freqNumber = freqNumber.toExponential(3);
    frequencyCH2 = scientificNotationToReal(freqNumber);
    vRmsCH2 = Math.sqrt(vRmsCH2/CH2Data.length).toFixed(3);
    vAvgCH2 = (vAvgCH2/CH2Data.length).toFixed(2);
    vppCH2 = (vMaxCH2 - vMinCH2).toFixed(2);
    vampCH2 = (vMaxCH2 - vAvgCH2).toFixed(2);
    vMaxCH2 = vMaxCH2.toFixed(2);
    vMinCH2 = vMinCH2.toFixed(2);
}
function measureMenu1(){
    //TODO - Escrever a frequencia e voltagens com mV ou kHz etc
    //TODO - Modificar o menu para se parecer com o do osciloscópio
    clearScreen();
    CH1MenuFlag = 0;
    CH2MenuFlag = 0;
    $("#menu-title").text("MEASURE");
    $("#menu-textTitle1").text("Source");
    if(sourceValue == 0){ $("#menu-text1").text("CH1"); }
    else if(sourceValue == 1){ $("#menu-text1").text("CH2"); }
    $("#menu-textTitle2").text("Volt Type");
    if(voltTypeValue == 0){ $("#menu-text2").text("Vpp"); }
    else if(voltTypeValue == 1){ $("#menu-text2").text("Vmax"); }
    else if(voltTypeValue == 2){ $("#menu-text2").text("Vmin"); }
    else if(voltTypeValue == 3){ $("#menu-text2").text("Vrms"); }
    else if(voltTypeValue == 4){ $("#menu-text2").text("Vavg"); }
    $("#menu-textTitle3").text("Time Type");
    if(timeTypeValue == 0){ $("#menu-text3").text("Frequency"); }
    else if(timeTypeValue == 1){ $("#menu-text3").text("Period"); }

    if(CH1Data == 0 && sourceValue == 0){
        $("#menu-soloText4").text("---");
        $("#menu-soloText5").text("---");
    }
    else if(CH2Data == 0 && sourceValue == 1){
        $("#menu-soloText4").text("---");
        $("#menu-soloText5").text("---");
    }
    else if(CH1Data != 0 && sourceValue == 0){
        if(voltTypeValue == 0){ $("#menu-soloText4").text(vppCH1 + "V");}
        else if(voltTypeValue == 1){ $("#menu-soloText4").text(vMaxCH1 + "V");}
        else if(voltTypeValue == 2){ $("#menu-soloText4").text(vMinCH1 + "V");}
        else if(voltTypeValue == 3){ $("#menu-soloText4").text(vRmsCH1 + "V");} 
        else if(voltTypeValue == 4){ $("#menu-soloText4").text(vAvgCH1 + "V");}
        if(timeTypeValue == 0){ $("#menu-soloText5").text(frequencyCH1 + "Hz");}
        else if(timeTypeValue == 1){ $("#menu-soloText5").text(periodCH1 + "s");}
    }
    else if(CH2Data != 0 && sourceValue == 1){
        if(voltTypeValue == 0){ $("#menu-soloText4").text(vppCH2 + "V");}
        else if(voltTypeValue == 1) { $("#menu-soloText4").text(vMaxCH2 + "V");}
        else if(voltTypeValue == 2) { $("#menu-soloText4").text(vMinCH2 + "V");}
        else if(voltTypeValue == 3) { $("#menu-soloText4").text(vRmsCH2 + "V");}
        else if(voltTypeValue == 4) { $("#menu-soloText4").text(vAvgCH2 + "V");}
        if(timeTypeValue == 0){ $("#menu-soloText5").text(frequencyCH2 + "Hz");}
        else if(timeTypeValue == 1){ $("#menu-soloText5").text(periodCH2 + "s");}
    }
}
function measureMenu2(){
    clearScreen();
    measureFlag = 2;
    CH1MenuFlag = 0;
    CH2MenuFlag = 0;
    $("#menu-title").text("DISPLAY ALL").css({"font-size": "15px", "top": "-3px"});
    $("#menu-soloText1").text("CH1");
    $("#menu-soloText2").text("CH2");
    $("#menu-soloText5").text("OFF");
}
function measureAllCH1(){
    if(CH1inputFlag == 1){
        $("#CH1vpp").text("Vpp: " + vppCH1 + "V");
        $("#CH1vamp").text("Vamp: " + (vppCH1/2) + "V");
        $("#CH1vmax").text("Vmax: " + vMaxCH1 + "V");
        $("#CH1vmin").text("Vmin: " + vMinCH1 + "V");
        $("#CH1vrms").text("Vrms: " + vRmsCH1 + "V");
        $("#CH1vavg").text("Vavg: " + vAvgCH1 + "V");
        $("#CH1freq").text("Frequency: " + frequencyCH1 + "Hz");
        $("#CH1period").text("Period: " + periodCH1 + "s");
    }
    else if(CH1inputFlag == 0){
        $("#CH1vpp").text("Vpp: chan off");
        $("#CH1vamp").text("Vamp: chan off");
        $("#CH1vmax").text("Vmax: chan off");
        $("#CH1vmin").text("Vmin: chan off");
        $("#CH1vrms").text("Vrms: chan off");
        $("#CH1vavg").text("Vavg: chan off");
        $("#CH1freq").text("Frequency: chan off");
        $("#CH1period").text("Period: chan off");
    }
}
function measureAllCH2(){
    if(CH2inputFlag == 1){
        $("#CH2vpp").text("Vpp: " + vppCH2 + "V");
        $("#CH2vamp").text("Vamp: " + (vppCH2/2) + "V");
        $("#CH2vmax").text("Vmax: " + vMaxCH2 + "V");
        $("#CH2vmin").text("Vmin: " + vMinCH2 + "V");
        $("#CH2vrms").text("Vrms: " + vRmsCH2 + "V");
        $("#CH2vavg").text("Vavg: " + vAvgCH2 + "V");
        $("#CH2freq").text("Frequency: " + frequencyCH2 + "Hz");
        $("#CH2period").text("Period: " + periodCH2 + "s");
    }
    else if(CH2inputFlag == 0){
        $("#CH2vpp").text("Vpp: chan off");
        $("#CH2vamp").text("Vamp: chan off");
        $("#CH2vmax").text("Vmax: chan off");
        $("#CH2vmin").text("Vmin: chan off");
        $("#CH2vrms").text("Vrms: chan off");
        $("#CH2vavg").text("Vavg: chan off");
        $("#CH2freq").text("Frequency: chan off");
        $("#CH2period").text("Period: chan off");
    }
}
function updateMenuMath(){
    if(mathOperationValue == 0){ mathOrderValue = 0; }
    if(mathOperationValue == 0){ $("#menu-text1").text("+"); }
    else if(mathOperationValue == 1){ $("#menu-text1").text("-"); }
    if(mathOperationValue == 0){ $("#menu-soloText2").text("CH1 + CH2").css({"font-size": "16px"}); }
    else if(mathOrderValue == 0 && mathOperationValue == 1){ $("#menu-soloText2").text("CH1 - CH2"); }
    else if(mathOrderValue == 1 && mathOperationValue == 1){ $("#menu-soloText2").text("CH2 - CH1"); }
    $("#menu-textTitle5").text("Scale");
    if(verticalScaleValueCH1 >= verticalScaleValueCH2){ 
        $("#menu-text5").text(scientificNotationToReal(verticalScaleList[verticalScaleValueCH1]) + "V"); 
    }
    else if (verticalScaleValueCH1 < verticalScaleValueCH2){ 
        $("#menu-text5").text(scientificNotationToReal(verticalScaleList[verticalScaleValueCH2]) + "V"); 
    }
    updateChart3();
}
function menuMath(){
    if(mathMenuFlag == 1){
        mathMenuFlag = 0;
        $("#myChart3").css("opacity", 0);
        mathDataFlag = 0;
    }
    else if(CH1inputFlag == 1 && CH2inputFlag == 1){
        resetMenuFlags();
        mathMenuFlag = 1;
        clearScreen();
        $("#menu-title").text("MATH");
        $("#menu-textTitle1").text("Operation");
        updateMenuMath();
        $("#myChart3").css("opacity", 1);
        mathDataFlag = 1;
    }
    else{
        alert("Both inputs must be working to use math");
    }
}
function runStop(){
    console.log("runStopValue: " + runStopValue);
    if(runStopValue == 0){
        if(mode == "simulation" ){
            if(CH1RealSignal == 1){ clearInterval(intervalRefCH1); }
            if(CH2RealSignal == 1){ clearInterval(intervalRefCH2); } 
        }
        else if(mode == "acquisition"){ sendPostRequest("/stop"); }
        $("#stop").css("display", "block");
        runStopValue = 1;
    }
    else if(runStopValue == 1){
        if(mode == "simulation" ){
            if(CH1RealSignal == 1){ intervalRefCH1 = setInterval(waveform1, 1000); }
            if(CH2RealSignal == 1){ intervalRefCH2 = setInterval(waveform2, 1000); }
        }
        else if(mode == "acquisition"){ sendPostRequest("/run"); }
        $("#stop").css("display", "none");
        runStopValue = 0;
    }
}
function acquisitionFunctionalities(){
    // Disable Cursors of unused buttons
    $("#display, #utility, #program, #saveRecall, #autoTestStop, #help, #cursor, #CH1Input, #CH2Input, #variable, #verticalPositionCH1, #verticalPositionCH2, #horizontalPosition").css("cursor", "not-allowed");
}
function updateTriggerMenu1(){
    console.log("Chamada");
    clearScreen();
    $("#menu-title").text("TRIGGER");
//? - Position 1 -
    $("#menu-textTitle1").text("Type");
    if(trigger.type == 0){
        $("#menu-text1").text("Edge");
        $("#trigger-type").text("EDGE");
    }
    else if(trigger.type == 1){
        $("#menu-text1").text("Video");
        $("#trigger-type").text("VIDEO");
    }
    else if(trigger.type == 2){
        $("#menu-text1").text("Pulse");
        $("#trigger-type").text("PULSE");
    }
    else if(trigger.type == 3){
        $("#menu-text1").text("Delay");
        $("#trigger-type").text("DELAY");
    }
//? - Position 2 -
    if(trigger.type == 0 || trigger.type == 1 || trigger.type == 2){ //? - Edge, Video or Pulse -
        $("#menu-textTitle2").text("Source");
        if(trigger.source == 0){
            $("#menu-text2").text("CH1");
            if(mode == "simulation"){ $("#trigger-source").text("CH1").css("color", "#fbff00"); }
        }
        else if(trigger.source == 1){
            $("#menu-text2").text("CH2");
            if(mode == "simulation"){ $("#trigger-source").text("CH2").css("color", "#00eaff"); }
        }
        else if(trigger.source == 4){
            $("#menu-text2").text("EXT");
            if(mode == "simulation"){ $("#trigger-source").text("EXT").css("color", "#ff0000"); }
        }
        else if(trigger.source == 5){
            $("#menu-text2").text("LINE");
            if(mode == "simulation"){ $("#trigger-source").text("LINE").css("color", "#ff0000"); }
        }
    }
    else if(trigger.type == 3){ //? - Delay -
        $("#menu-textTitle2").text("By Time");
        $("#menu-text2").text(" ");
    }
//? - Position 3 -
    if(trigger.type == 0 || trigger.type == 2){ //? - Edge or Pulse -
        $("#menu-textTitle3").text("Mode");
        if(trigger.mode == 0){ $("#menu-text3").text("Auto"); }
        else if(trigger.mode == 1){ $("#menu-text3").text("Normal"); }
        else if(trigger.mode == 2){ $("#menu-text3").text("Single"); }
    }
    else if(trigger.type == 1){ //? - Video -
        $("#menu-textTitle3").text("Standard");
        if(trigger.standard == 0){ $("#menu-text3").text("NTSC"); }
        else if(trigger.standard == 1){ $("#menu-text3").text("PAL"); }
        else if(trigger.standard == 2){ $("#menu-text3").text("SECAM"); }
    }
    else if(trigger.type == 3){ //? - Delay -
        $("#menu-textTitle3").text("By Event");
    }
//? - Position 4 -
    if(trigger.type == 1){ //? - Video -
        $("#menu-textTitle4").text("Polarity");
        if(trigger.polarity == 0){ $("#menu-text4").text("Positive"); }
        else if(trigger.polarity == 1){ $("#menu-text4").text("Negative"); }
    }
    else if(trigger.type == 3){ //? - Delay -
        $("#menu-textTitle4").text("Ext:");
    }
//? - Position 5 -
    if(trigger.type == 0 || trigger.type == 2 || trigger.type == 3){ //? - Edge, Pulse or Delay -
        $("#menu-textTitle5").text("Slope / Coupling");
    }
    else if(trigger.type == 1){ //? - Video -
        $("#menu-textTitle5").text("Line");
    }

/*
    $("#menu-textTitle3").text("Slope"); //? - Position 3
    if(trigger.slope == 0){ $("#menu-text3").text("Rising"); }
    else if(trigger.slope == 1){ $("#menu-text3").text("Falling"); }
    $("#menu-textTitle4").text("Level"); //? - Position 4
    if(triggerLevelVolt < (10 ** -6) && triggerLevelVolt > -(10 ** -6)){ triggerLevelVolt = 0; }
    triggerLevelVolt = scientificNotationToReal(triggerLevelVolt.toExponential(3));
    $("#menu-text4").text(triggerLevelVolt + "V");
*/

    if(mode == "simulation"){
        if(CH1inputFlag == 1){ updateChart1(); }
        if(CH2inputFlag == 1){ updateChart2(); }
    }
}
function updateTriggerSlopeMenu(){
    clearScreen();
    $("#menu-title").text("TRIGGER");
//? ---- Position 1----
    $("#menu-textTitle1").text("Slope");
    if(trigger.slope == 0){ 
        $("#menu-text1").text("Rising");
        // TODO - Adicionar Slope Image
    }
    else if(trigger.slope == 1){ 
        $("#menu-text1").text("Falling");
    }
//? - Position 2 -
    $("#menu-textTitle2").text("Coupling");
    if(trigger.coupling == 0){ $("#menu-text2").text("DC"); }
    else if(trigger.coupling == 1){ $("#menu-text2").text("AC"); }
//? - Position 3 -
    $("#menu-textTitle3").text("Rejection");
    if(trigger.rejection == 0){ $("#menu-text3").text("Off"); }
    else if(trigger.rejection == 1){ $("#menu-text3").text("LF"); }
    else if(trigger.rejection == 2){ $("#menu-text3").text("HF"); }
//? - Position 4 -
    $("#menu-textTitle4").text("Noise Rej");
    if(trigger.noiseRej == 0){ $("#menu-text4").text("Off"); }
    else if(trigger.noiseRej == 1){ $("#menu-text4").text("On"); }
//? - Position 5 - 
    $("#menu-textTitle5").text("Previous Menu");
}
function menuTrigger(){
    clearScreen();
    if(trigger.menu == 1){ 
        trigger.menu= 2;
        updateTriggerMenu2();
    }
    else{ 
        resetMenuFlags();
        trigger.menu = 1;
        updateTriggerMenu1();
    }
}
function menuAcquire(){
    clearScreen();
    resetMenuFlags();
    acquireMenuFlag = 1;
    $("#menu-title").text("ACQUIRE");
    $("#menu-soloText1").text("Normal");
    $("#menu-soloText2").text("Peak Detect");
    $("#menu-textTitle3").text("Average");
    $("#menu-text3").text(" ");
    if(acquireModeValue == 2){
        if(acquireAverageValue == 0){ $("#menu-text3").text("2"); }
        else if(acquireAverageValue == 1){ $("#menu-text3").text("4"); }
        else if(acquireAverageValue == 2){ $("#menu-text3").text("8"); }
        else if(acquireAverageValue == 3){ $("#menu-text3").text("16"); }
        else if(acquireAverageValue == 4){ $("#menu-text3").text("32"); }
        else if(acquireAverageValue == 5){ $("#menu-text3").text("64"); }
        else if(acquireAverageValue == 6){ $("#menu-text3").text("128"); }
        else if(acquireAverageValue == 7){ $("#menu-text3").text("256"); }
    }
    else if(acquireModeValue == 1){ $("#menu-text1").text("Peak Detect"); }
    $("#menu-textTitle5").text("Mem Leng");
    if(acquireMemLengValue == 0){ $("#menu-text5").text("500"); }
    else if(acquireMemLengValue == 1){ $("#menu-text5").text("12500"); }
    else if(acquireMemLengValue == 2){ $("#menu-text5").text("25000"); }
}
function menuHorizontal(){
    clearScreen();
    resetMenuFlags();
    horizontalMenuFlag = 1;
    $("#menu-title").text("Hor. MENU").css({"font-size": "16px", "top": "-3px"});
    $("#menu-soloText1").text("Main");
    $("#menu-soloText2").text("Window");
    $("#menu-textTitle3").text("Window Zoom");
    $("#menu-soloText4").text("Roll");
    $("#menu-soloText5").text("XY");
}