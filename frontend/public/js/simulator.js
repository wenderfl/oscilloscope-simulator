var CH1ChangableWave = 0;
var CH2ChangableWave = 0;
var CH1SignalGenerator = 0;
var CH2SignalGenerator = 0;
var CH1RealSignal = 0;
var CH2RealSignal = 0;
var frequencyValueCH1 = 1;
var frequencyCH1_Value = 1000;
var periodCH1_Value = 0.001;
var periodCH1_Value_2 = 0.001;
var frequencypowerCH1 = 1000;
var frequencyValueCH2 = 1;
var frequencyCH2_Value = 1000;
var periodCH2_Value = 0.001;
var frequencypowerCH2 = 1000;
var amplitudeValueCH1 = 1;
var amplitudeValueCH2 = 1;
var offsetValueCH1 = 0;
var offsetValueCH2 = 0;
var intervalRefWaveformLostCH1 = 0;
var intervalRefWaveformLostCH2 = 0;
var CH1ExtSignal = 0;
var CH2ExtSignal = 0;
var CH1inputFlag = 0;
var CH2inputFlag = 0;
var CH1input = 0
var CH2input = 0;
var CH1BaseData = [];
var XYData = [];
var horizontalSweep = 0;

//TODO - Adicionar todas as funções que serão apenas usadas no simulador
function interpulation(time, data) {
    let time2;
    let j = 0;
    data.forEach(d => {
        j++;
        if(j == data.length){
            time2 = parseFloat(d.Time);
        }
    });
    while(time > time2){ time = time - time2; }
    for (var i = 0; i < data.length-1; i++) {
        if (time >= data[i].Time && time <= data[i + 1].Time) {
            var t1 = data[i].Time;
            var t2 = data[i + 1].Time;
            var v1 = data[i].Amplitude;
            var v2 = data[i + 1].Amplitude;
            var frac = (time - t1) / (t2 - t1);
            return v1 + frac * (v2 - v1);
        }
    }
    return 0;
}
function sineWaveCH1(){
    resetInputCH1Flags();
    d3.csv('waveforms/sinewave.csv').then(data => {
        CH1BaseData = JSON.parse(JSON.stringify(data));
        console.log(CH1BaseData);
        CH1ChangableWave = 1;
        CH1input = 1;
        CH1inputFlag = 1;
        updateChart1();
        $("#CH1Input").css("opacity", "1");
        if(CH1Display == 0){
            $("#alertMessage").css("display", "block");
            $("#alertMessage").text("CH1 is not active");
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                $("#alertMessage").css("display", "none");
            }, 5000);
        }
    }).catch(error => {
        console.error(error);
    });
    $("#signalGeneratorSelectedWaveCH1").css("top", 115);
    $("#signalGeneratorSelectedWaveCH1").css("left", 795);
}
function sineWaveCH2(){
    resetInputCH2Flags();
    d3.csv('waveforms/sinewave.csv').then(data => {
        CH2BaseData = JSON.parse(JSON.stringify(data));
        CH2ChangableWave = 1;
        CH2input = 1;
        CH2inputFlag = 1;
        updateChart2();
        $("#CH2Input").css("opacity", "1");
        if(CH2Display == 0){
            $("#alertMessage").css("display", "block");
            $("#alertMessage").text("CH2 is not active");
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                $("#alertMessage").css("display", "none");
            }, 5000);
        }
    }).catch(error => {
        console.error(error);
    });
    $("#signalGeneratorSelectedWaveCH2").css("top", 115);
    $("#signalGeneratorSelectedWaveCH2").css("left", 795);
}
function squareWaveCH1(){
    resetInputCH1Flags();
    d3.csv('waveforms/squarewave.csv').then(data => {
        CH1BaseData = JSON.parse(JSON.stringify(data));
        CH1ChangableWave = 1;
        CH1input = 1;
        CH1inputFlag = 1;
        updateChart1();
        $("#CH1Input").css("opacity", "1");
        if(CH1Display == 0){
            $("#alertMessage").css("display", "block");
            $("#alertMessage").text("CH1 is not active");
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                $("#alertMessage").css("display", "none");
            }, 5000);
        }
    }).catch(error => {
        console.error(error);
    });
    $("#signalGeneratorSelectedWaveCH1").css("top", 115);
    $("#signalGeneratorSelectedWaveCH1").css("left", 710);
}
function squareWaveCH2(){
    resetInputCH2Flags();
    d3.csv('waveforms/squarewave.csv').then(data => {
        CH2BaseData = JSON.parse(JSON.stringify(data));
            CH2ChangableWave = 1;
            CH2input = 1;
            CH2inputFlag = 1;
            updateChart2();
            $("#CH2Input").css("opacity", "1");
            if(CH2Display == 0){
                $("#alertMessage").css("display", "block");
                $("#alertMessage").text("CH2 is not active");
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    $("#alertMessage").css("display", "none");
                }, 5000);
            }
    }).catch(error => {
        console.error(error);
    });
    $("#signalGeneratorSelectedWaveCH2").css("top", 115);
    $("#signalGeneratorSelectedWaveCH2").css("left", 710);
}
function triangularWaveCH1(){
    resetInputCH1Flags();
    d3.csv('waveforms/triangularwave.csv').then(data => {
        CH1BaseData = JSON.parse(JSON.stringify(data));
        CH1ChangableWave = 1;
        CH1input = 1;
        CH1inputFlag = 1;
        updateChart1();
        $("#CH1Input").css("opacity", "1");
        if(CH1Display == 0){
            $("#alertMessage").css("display", "block");
            $("#alertMessage").text("CH1 is not active");
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                $("#alertMessage").css("display", "none");
            }, 5000);
        }
    }).catch(error => {
        console.error(error);
    });
    $("#signalGeneratorSelectedWaveCH1").css("top", 115);
    $("#signalGeneratorSelectedWaveCH1").css("left", 753);
}
function triangularWaveCH2(){
    resetInputCH2Flags();
    d3.csv('waveforms/triangularwave.csv').then(data => {
        CH2BaseData = JSON.parse(JSON.stringify(data));
        CH2ChangableWave = 1;
        CH2input = 1;
        CH2inputFlag = 1;
        updateChart2();
        $("#CH2Input").css("opacity", "1");
        if(CH2Display == 0){
            $("#alertMessage").css("display", "block");
            $("#alertMessage").text("CH2 is not active");
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                $("#alertMessage").css("display", "none");
            }, 5000);
        }
    }).catch(error => {
        console.error(error);
    });
    $("#signalGeneratorSelectedWaveCH2").css("top", 115);
    $("#signalGeneratorSelectedWaveCH2").css("left", 753);
}
function inputCH1(){
    if(CH1inputFlag == 0){
        if(CH1input == 0){
            offCanvas = 1;
            $("#inputOffcanvas-ch1").css("display", "block");
            decreaseOpacity();
        }
        else if(CH1input == 1){
            showGraph1(CH1Data);
            CH1inputFlag = 1;
            $("#CH1Input").css("opacity", "1");
        }
    }
    else if(CH1inputFlag == 1){
        $("#CH1Input").css("opacity", "0");
        CH1inputFlag = 0;
        updateChart1();
        //showGraph1(dcSignal);
    }
    measureAllCH1();
}
function inputCH2(){
    if(CH2inputFlag == 0){
        if(CH2input == 0){
            offCanvas = 1;
            $("#inputOffcanvas-ch2").css("display", "block");
            decreaseOpacity();
        }
        else if(CH2input == 1){
            showGraph2(CH2Data);
            CH2inputFlag = 1;
            $("#CH2Input").css("opacity", "1");
        }
    }
    else if(CH2inputFlag == 1){
        $("#CH2Input").css("opacity", "0");
        CH2inputFlag = 0;
        showGraph2(dcSignal);
    }
    measureAllCH2();
}
function resetInputCH1Flags(){
    CH1ChangableWave = 0;
    CH1CalibrationWave = 0;
    CH1RealSignal = 0;
    clearInterval(intervalRefCH1);
}
function resetInputCH2Flags(){
    CH2ChangableWave = 0;
    CH2CalibrationWave = 0;
    CH2RealSignal = 0;
    clearInterval(intervalRefCH2);
}
function calibration(channel) {
    d3.csv('waveforms/calibration.csv').then(data => {
        if(channel == "CH1"){
            CH1BaseData = JSON.parse(JSON.stringify(data));
            resetInputCH1Flags();
            CH1CalibrationWave = 1;
            CH1input = 1;
            CH1inputFlag = 1;
            updateChart1();
            $("#CH1Input").css("opacity", "1");
        }
        else if(channel == "CH2"){
            CH2BaseData = JSON.parse(JSON.stringify(data));
            resetInputCH2Flags();
            CH2CalibrationWave = 1;
            CH2input = 1;
            CH2inputFlag = 1;
            updateChart2();
            $("#CH2Input").css("opacity", "1");
        }
    }).catch(error => {
        console.error(error);
    });
}
function signalGeneratorCH1() {
    if(CH1ChangableWave == 0){ sineWaveCH1(); }
    CH1SignalGenerator = 1;
    $("#signalGeneratorOffcanvasCH1").css("display", "block");
    $("#signalGeneratorOffcanvasCH1").css("top", 500);
    $("#signalGeneratorOffcanvasCH1").css("left", 200);
    $("#signalGeneratorHeaderCH1").text("CH1 Signal Generator");
    $("#signalGeneratorDragHeaderCH1").css("background-color", "#f9a149").css("color", "black");
}
function signalGeneratorCH2() {
    if(CH2ChangableWave == 0){ sineWaveCH2(); }
    CH2SignalGenerator = 1;
    $("#signalGeneratorOffcanvasCH2").css("display", "block");
    $("#signalGeneratorOffcanvasCH2").css("top", 550);
    $("#signalGeneratorOffcanvasCH2").css("left", 200);
    $("#signalGeneratorDragHeaderCH2").css("background-color", "#245992").css("color", "white");
}
function frequencySignalCH1(){
    if(CH1ChangableWave == 1){ 
        if(frequencyValueCH1 < 0.2){ frequencyValueCH1 = 0.2; }
        if(frequencyValueCH1 > 2){ frequencyValueCH1 = 2; }
        frequencyCH1_Value = (frequencypowerCH1 * frequencyValueCH1).toFixed(2);
        periodCH1_Value_2 = 1/frequencyCH1_Value;
        periodCH1_Value = scientificNotationToReal((1/frequencyCH1_Value).toExponential(3));
        updateChart1();
        $("#signalFrequency").text(frequencyCH1 + "Hz");
    }
}
function frequencySignalCH2(){
    if(CH2ChangableWave == 1){
        if(frequencyValueCH2 < 0.2){ frequencyValueCH2 = 0.2; }
        if(frequencyValueCH2 > 2){ frequencyValueCH2 = 2; }
        frequencyCH2_Value = (frequencypowerCH2 * frequencyValueCH2).toFixed(2);
        periodCH2_Value = scientificNotationToReal((1/frequencyCH2_Value).toExponential(3));
        updateChart2();
    }
}
function amplitudeSignalCH1(){
    if(CH1ChangableWave == 1){
        if(amplitudeValueCH1 < 0){ amplitudeValueCH1 = 0; }
        if(amplitudeValueCH1 > 10){ amplitudeValueCH1 = 10; }
        updateChart1();
    }
}
function amplitudeSignalCH2(){
    if(CH2ChangableWave == 1){
        if(amplitudeValueCH2 < 0){ amplitudeValueCH2 = 0; }
        if(amplitudeValueCH2 > 10){ amplitudeValueCH2 = 10; }
        updateChart2();
    }
}
function offsetSignalCH1(){
    if(CH1ChangableWave == 1){
        if(offsetValueCH1 < -10){ offsetValueCH1 = -10; }
        if(offsetValueCH1 > 10){ offsetValueCH1 = 10; }
        updateChart1();
    }
}
function offsetSignalCH2(){
    if(CH2ChangableWave == 1){
        if(offsetValueCH2 < -10){ offsetValueCH2 = -10; }
        if(offsetValueCH2 > 10){ offsetValueCH2 = 10; }
        updateChart2();
    }
}

function detectDecimalSeparator(delimiter) {
    decimal = ',';
    if(delimiter == ';'){ decimal = ','; }
    else if(delimiter == ','){ decimal = '.'; }
    return decimal;
    // Se nenhum separador decimal for detectado, retorne o padrão ','
}
function detectDelimiter(csvText) {
    if (!csvText.trim()) {
        return ';'; // Ou outro delimitador padrão
      }
    
      const possibleDelimiters = [',', ';', '\t', '|'];
      for (const delimiter of possibleDelimiters) {
        const parsed = d3.csvParse(csvText.split('\n').map(line => line.split(delimiter)).join('\n'));
        if (parsed.length > 1 && Object.keys(parsed[0]).length > 1) {
          return delimiter;
        }
      }
      // Se nenhum delimitador for detectado, retorne o padrão ';'
      return ';';
}
// TODO - Implementada uma possível solução para ler csv independentemente do delimitador e do separador decimal
function processData(csvData) {//External Signal
    const delimiter = detectDelimiter(csvData); // Detecta o delimitador do csv
    const decimalSeparator = detectDecimalSeparator(delimiter); // Detecta o separador decimal do csv
    if(decimalSeparator == ','){ csvData = csvData.replace(new RegExp(decimalSeparator, 'g'), '.'); } // Substitui o separador decimal por '.'
    if(delimiter == ';'){ csvData = csvData.replace(new RegExp(delimiter, 'g'), ','); } // Substitui o delimitador por ','
    //const csvDataWithDotDecimal = csvData.replace(new RegExp(decimalSeparator, 'g'), '.'); // 
    // Use d3.csvParse com o delimitador detectado
    const data = d3.csvParse(csvData);
    //const data = d3.csvParse(csvData);


    if(CH1ExtSignal == 1){
        CH1BaseData = JSON.parse(JSON.stringify(data));
        resetInputCH1Flags();
        CH1input = 1;
        CH1inputFlag = 1;
        CH1ExtFlag = 0;
        updateChart1();
        $("#CH1Input").css("opacity", 1);
        if(CH1Display == 0){
            $("#alertMessage").css("display", "block");
            $("#alertMessage").text("CH1 is not active");
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                $("#alertMessage").css("display", "none");
            }, 5000);
        }
    }
    else if(CH2ExtSignal == 1){
        CH2BaseData = JSON.parse(JSON.stringify(data));
        resetInputCH2Flags();
        CH2input = 1;
        CH2inputFlag = 1;
        CH2ExtFlag = 0;
        updateChart2();
        $("#CH2Input").css("opacity", 1);
        if(CH2Display == 0){
            $("#alertMessage").css("display", "block");
            $("#alertMessage").text("CH2 is not active");
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                $("#alertMessage").css("display", "none");
            }, 5000);
        }
    }

}
function realSignal(channel) {
    // TODO - Corrigir o problema de ao selecionar este input, automaticamente atualizar tudo para isto, atualizar também ao desligar o canal para desligar o modo de aquisição real.
    if(channel == "CH1"){
        CH1inputFlag = 1;
        resetInputCH1Flags();
        CH1RealSignal = 1;
        intervalRefCH1 = setInterval(waveform1, 1000);
        askData("CH1");
        $("#CH1Input").css("opacity", 1);
    }
    else if(channel == "CH2"){
        CH1inputFlag = 1;
        resetInputCH2Flags();
        CH2RealSignal = 1;
        intervalRefCH2 = setInterval(waveform2, 1000);
        askData("CH2");
        $("#CH2Input").css("opacity", 1);
    }
}
function waveformLostCH1(){
    distanceTraveledCH1 = Math.random() * (1 - (-1)) + (-1);
    showGraph1(CH1Data);
}
function waveformLostCH2(){
    distanceTraveledCH2 = Math.random() * (1 - (-1)) + (-1);
    showGraph2(CH2Data);
}
function triggerLevel(){
    if(mode == "simulation"){
        if(trigger.level < -1){ trigger.level = -1; }
        if(trigger.level > 1){ trigger.level = 1; }
// TODO - Se o sinal for diferente da fonte do trigger ver o que fazer.
        if(trigger.source == 0){ // CH1
            let valueMax = d3.max(CH1Data, d => parseFloat(d.Amplitude));
            let valueMin = d3.min(CH1Data, d => parseFloat(d.Amplitude)); 
            triggerLevelVolt = 4 * verticalScaleCH1_Value * trigger.level; // Trigger Level in Volts
            // TODO - Criar caso o sinal esteja invertido ou com o slope invertido para poder funcionar da mesma maneira
            // TODO - Caso exista posição vertical, o trigger level segue a posição vertical
            // TODO - Caso se altere a escala vertical, o trigger level ajusta-se em função da escala.
            let triggerTime = 0;
            for (let i = 0; i < CH1Data.length; i++) {
                let triggerAmplitude = parseFloat(CH1Data[i].Amplitude);
                if( triggerLevelVolt > 0){
                    if (triggerLevelVolt < triggerAmplitude) {
                        triggerTime = -parseFloat(CH1Data[i].Time);
                        break;
                    }
                }
                else if(triggerLevelVolt < 0){
                    if (triggerLevelVolt > -triggerAmplitude) {
                        triggerTime = parseFloat(CH1Data[i].Time);
                        break;
                    }
                }
            }
            timeTraveledCH1 = triggerTime; 
            if(triggerLevelVolt < valueMax && triggerLevelVolt > valueMin){ // Trigger Level is in the range of the signal
                if(intervalRefWaveformLostCH1){ 
                    clearInterval(intervalRefWaveformLostCH1);
                    intervalRefWaveformLostCH1 = 0;
                }
                distanceTraveledCH1 = 0;
            }
            else if(triggerLevelVolt > valueMax || triggerLevelVolt < valueMin){ // Trigger Level is not in the range of the signal
                if(intervalRefWaveformLostCH1 == 0){ intervalRefWaveformLostCH1 = setInterval(waveformLostCH1, 50); }
            }
        }
        else if(trigger.source == 1){ // CH2
            let valueMax = d3.max(CH2Data, d => parseFloat(d.Amplitude));
            let valueMin = d3.min(CH2Data, d => parseFloat(d.Amplitude));
            triggerLevelVolt = 4 * verticalScaleCH2_Value *trigger.level;
            let triggerTime = 0;
            for (let i = 0; i < CH2Data.length; i++) {
                let triggerAmplitude = parseFloat(CH2Data[i].Amplitude);
                if( triggerLevelVolt > 0){
                    if (triggerLevelVolt < triggerAmplitude) {
                        triggerTime = parseFloat(CH2Data[i].Time);
                        break;
                    }
                }
                else if(triggerLevelVolt < 0){
                    if (triggerLevelVolt > -triggerAmplitude) {
                        triggerTime = -parseFloat(CH2Data[i].Time);
                        break;
                    }
                }
            }
            timeTraveledCH2 = -triggerTime;
            if(triggerLevelVolt < valueMax && triggerLevelVolt > valueMin){
                if(intervalRefWaveformLostCH2){
                    clearInterval(intervalRefWaveformLostCH2);
                    intervalRefWaveformLostCH2 = 0;
                }
                distanceTraveledCH2 = 0;
            }
            else if(triggerLevelVolt > valueMax || triggerLevelVolt < valueMin){
                if(intervalRefWaveformLostCH2 == 0){ intervalRefWaveformLostCH2 = setInterval(waveformLostCH2, 50); }
            }
        }

        if(trigger.position + trigger.level > 1 || trigger.position + trigger.level < -1){ $("#cursor-trigger").css("display", "none"); }
        else{ $("#cursor-trigger").css("display", "block"); }

        $("#cursor-trigger").css("top", -(trigger.level + trigger.position)*147.5+137); // Moves the cursor to the new position
        if(triggerLevelVolt > 0 && triggerLevelVolt < 10**-6 || triggerLevelVolt < 0 && triggerLevelVolt > -(10**-6)){ triggerLevelVolt = 0; }
        let string = scientificNotationToReal(triggerLevelVolt.toExponential(3));
        $("#alertMessage").css("display", "block");
        $("#alertMessage").text("Trigger Level=" + string + "V");
        if (timeoutId) { clearTimeout(timeoutId); } // Clears the previous timeout
        timeoutId = setTimeout(() => { 
            $("#alertMessage").css("display", "none"); 
        }, 2000); // After 2 seconds, the alert message disappears
        // Ajustar o ponto que encosta o eixo do y.
        // Ao mexer tem de se ter em conta o valor da amplitude do sinal (igual ao horizontal position) 
        if(trigger.menu == 1 && mode == "simulation"){ updateTriggerMenu1(); }
        if(CH1inputFlag == 0){ 
            updateChart1();
            //showGraph1(dcSignal); 
        }
        else if(CH1inputFlag == 1){ 
            updateChart1();
            //showGraph1(CH1Data); 
        }
    }
}
function showGraphXY(data){
    svg1 = d3.select('#myChart1');

    const width = 368;
    const height = 295;

    const verticalScaleCH1 = verticalScaleList[verticalScaleValueCH1]*4
    const verticalScaleCH2 = verticalScaleList[verticalScaleValueCH2]*4

    svg1.attr('width', width).attr('height', height);

    svg1.selectAll('*').remove();

    const xScale = d3.scaleLinear()
                     .domain([-verticalScaleCH1, verticalScaleCH1])
                     .range([0, width]);
    const yScale = d3.scaleLinear()
                     .domain([-verticalScaleCH2, verticalScaleCH2])
                     .range([height, 0]);
    const line = d3.line()
                    .x(d => xScale((d.CH1Amplitude + verticalScaleCH1) / (10 ** probeValueCH1)))
                    .y(d => yScale((d.CH2Amplitude + verticalScaleCH2) / (10 ** probeValueCH2)));

    const translatedData = data.map(d => ({ CH1Amplitude: d.CH1Amplitude, CH2Amplitude: d.CH2Amplitude }));
    svg1.append('path')
        .datum(translatedData)
        .attr('fill', 'none')
        .attr('stroke', 'rgb(255, 255, 40)')
        .attr('stroke-width', 2)
        .attr('d', line);
}
function updateChartXY(){
    if(CH1Data.length == CH2Data.length){
        let XYDataTemp = [];
        XYDataTemp[0] = ["CH1Amplitude", "CH2Amplitude"];
        for (let i = 1; i <= CH1Data.length; i++){
            let CH1DataValue = parseFloat(CH1Data[i-1].Amplitude);
            let CH2DataValue = parseFloat(CH2Data[i-1].Amplitude);
            XYDataTemp.push([CH1DataValue, CH2DataValue]); 
        }
        XYData = [];
        const keys = XYDataTemp[0];
        for (let i = 1; i < XYDataTemp.length-1; i++) {
            const values = XYDataTemp[i];
            const object = {};
            keys.forEach((key, index) => { object[key] = values[index]; });
            XYData.push(object);
        }
        showGraphXY(XYData);
    }
}