//* This file has the functions related to the acquisition of the oscilloscope data.

//? ------------------- Request  ------------------- //

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

//? ------------------- Get Real Oscilloscope Data ------------------- //

function askData(data){
    if(data == "CH1"){ sendGetRequest("/CH1Data"); }
    else if(data == "CH2"){ sendGetRequest("/CH2Data"); }
    else if(data == "measure"){ sendGetRequest("/measureData"); }
    else{ sendGetRequest("/data"); }
}

//? ------------------- Get Real Oscilloscope Waveform  ------------------- //

function waveformCH1(){
    sendGetRequest("/acq/mem1");
}
function waveformCH2(){
    sendGetRequest("/acq/mem2");
}
function waves(){
    // TODO - Definir um intervalo de tempo que tenha em conta o tamanho do pedido e canais ligados.
    // TODO - Modificar o document.getElementById pelo jquery
    //let intervalTime = (verticalDisplayCH1 * 2000) + (verticalDisplayCH2 * 2000);
    //! if(CH1Display == 1 && intervalCH1flag == 0){
    if(ch1.display == 1 && interval.ch1Flag == 0){
        //! intervalRefCH1 = setInterval(waveformCH1, 1000); // Valor 1 segundo quando apenas 1 canal estiver ligado 2 segundos para 2 canais. 500ms é muito bom
        interval.ch1 = setInterval(waveformCH1, 1000); // Valor 1 segundo quando apenas 1 canal estiver ligado 2 segundos para 2 canais. 500ms é muito bom
        //! document.getElementById('myChart1').style.display = "block";
        $("#myChart1").css("display", "block"); // TODO - Testar se este comando está bem, se estiver modificar todos que modificam o opacity para display
        //! intervalCH1flag = 1;
        interval.ch1Flag = 1;
    }
    if(ch1.display == 0 && interval.ch1Flag == 1){
        clearInterval(interval.ch1)
        $("#myChart1").css("display", "none");
        interval.ch1Flag = 0;
    }
/*
    if(CH1Display == 0 && intervalCH1flag == 1){
        clearInterval(intervalRefCH1);
        document.getElementById('myChart1').style.display = "none";
        intervalCH1flag = 0;
    }
*/
    if(CH2Display == 1 && intervalCH2flag == 0){
        intervalRefCH2 = setInterval(waveformCH2, 1000); // Valor 1 segundo quando apenas 1 canal estiver ligado 2 segundos para 2 canais
        document.getElementById('myChart2').style.display = "block";
        intervalCH2flag = 1;
    }
    if(CH2Display == 0 && intervalCH2flag == 1){
        clearInterval(intervalRefCH2);
        document.getElementById('myChart2').style.display = "none";
        intervalCH2flag = 0;
    }
}

//? ------------------- Handle Waveform Response  ------------------- //

function hexToValue(hexString) { //* Used to determine the time between two adjacent points received from the oscilloscope.
    let buffer = new ArrayBuffer(4);
    let dataView = new DataView(buffer);

    dataView.setUint8(0, hexString[3]);
    dataView.setUint8(1, hexString[2]);
    dataView.setUint8(2, hexString[1]);
    dataView.setUint8(3, hexString[0]);

    let floatValue = dataView.getFloat32(0, true); // The second parameter (true) is for little endian

    return floatValue.toExponential(3);
}

//? ------------------- Draw Chart  ------------------- //

function updateChartReal(channel, val, dir) { //* Steps to show the waveform received from the oscilloscope
    let wave = []; // TODO ----- Adicionado, testar! -----
    if (channel == 1) { //* CH1 related
        for(let i=125; i<375; i++){ // Grabs the middle of the received information (the one showed on the real oscilloscope screen)
            //* Decides if the point is related to the superior/inferior part of the graph (dir) variable.
            if(dir[i] == 0){ wave[i-125] = val[i]; }
            else if(dir[i] == 255){ wave[i-125] = val[i] - 255; }
        }
        // TODO -> Modificar a variável verticalScaleCH1_Value_Real para uma classe.
        let value = verticalScaleCH1_Value_Real*4; // In order to know the amplitude of the signal, we need to know the vertical scale of the oscilloscope
        for(let i=0; i<250; i++){ wave[i] = (wave[i] * value)/102.4; } // 128 is the value used for 5 divs so 102.4 is the value for 4 divs
        //! CH1BaseData = [];
        ch1.base = [];
        let timeCH1 = [];
        for(let i=0; i<250; i++){ timeCH1[i] = time[i] * timeIntervalCH1; }
        //! CH1BaseData[0] = ["Time", "Amplitude"];
        ch1.base[0] = ["Time", "Amplitude"];
        //! for (let i = 1; i <= wave.length; i++){ CH1BaseData.push([timeCH1[i], wave[i]]); }
        for (let i = 1; i <= wave.length; i++){ ch1.base.push([timeCH1[i], wave[i]]); }
        //! CH1Data = [];
        ch1.data = [];
        //! const keys = CH1BaseData[0];
        const keys = ch1.base[0];
        //! for (let i = 1; i < CH1BaseData.length-1; i++) {
        for (let i = 1; i < ch1.base.length-1; i++) {
            //! const values = CH1BaseData[i];
            const values = ch1.base[i];
            const object = {};
            keys.forEach((key, index) => { object[key] = values[index]; });
            //! CH1Data.push(object);
            ch1.data.push(object);
        }
        //! if(CH1Display == 1){ $("#myChart1").css("opacity", 1); }
        if(ch1.display == 1){ $("#myChart1").css("opacity", 1); }
        //! else if(CH1Display == 0){ $("#myChart1").css("opacity", 0); }
        else if(ch1.display == 0){ $("#myChart1").css("opacity", 0); }
        //! showGraph1Real(CH1Data);
        showGraph1Real(ch1.data);
    }
    if (channel == 2) { //* CH2 related
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