//TODO - Verificar esta função
//TODO - Corrigir as variáveis precisarem de ser resetadas entre modos para não haver conflitos
//TODO - Adicionar os restantes comandos que enviam ou recebem as informações do servidor
var numberOfPointsCH1 = null;
var numberOfPointsCH2 = null;
var firstTime = 0;
function handleResponse(response) {
    if(response.status == 200) {
        if(response.on == 1){
            mode = 'acquisition';
            power();
        }
        if(response.verticalScaleCH1_value){
            let value = response.verticalScaleCH1_value;
            for(i = 0; i<verticalScaleList.length; i++){
                if(value == verticalScaleList[i]){
                    verticalScaleCH1_Value_Real = verticalScaleList[i];
                    verticalScaleCH1_Value = verticalScaleCH1_Value_Real;
                    verticalScaleValueCH1 = i;
                    break;
                }
            }
            verticalScaleCH1_Value_Real = (verticalScaleCH1_Value_Real * (10 ** probeValueCH1));
            verticalScaleCH1_Value_Real = verticalScaleCH1_Value_Real.toExponential(3);
            let string = scientificNotationToReal(verticalScaleCH1_Value_Real);
            $("#ch1-voltageScale").text(string + "V");
        }
        if(response.verticalScaleCH2_value){
            let value = response.verticalScaleCH2_value;
            for(i = 0; i<verticalScaleList.length; i++){
                if(value == verticalScaleList[i]){
                    verticalScaleCH2_Value_Real = verticalScaleList[i];
                    verticalScaleCH2_Value = verticalScaleCH2_Value_Real;
                    verticalScaleValueCH2 = i;
                    break;
                }
            }
            verticalScaleCH2_Value_Real = (verticalScaleCH2_Value_Real * (10 ** probeValueCH2));
            verticalScaleCH2_Value_Real = verticalScaleCH2_Value_Real.toExponential(3);
            let string = scientificNotationToReal(verticalScaleCH2_Value_Real);
            $("#ch2-voltageScale").text(string + "V");
        }
        if(response.horizontalScale_value){
            let value = response.horizontalScale_value;
            for(i = 0; i<horizontalScaleList.length; i++){
                if(value == horizontalScaleList[i]){
                    value = horizontalScaleList[i];
                    horizontalScaleValue = i;
                    break;
                }
            }
            let string = scientificNotationToReal(value);
            $("#time-horizontalScale").text(string + "s");
        }
        if(response.displayCH1_value || response.displayCH1_value == 0){
            CH1Display = response.displayCH1_value;
            if(firstTime == 0){
                if(CH1Display == 1){ 
                    resetMenuFlags();
                    CH1MenuFlag = 1; 
                    updateCH1Menu();
                }
                firstTime++;
            }
            if(CH1Display == 1){ 
                $("#ch1-button").css("opacity", 1);
                $("#myChart1").css("opacity", 1);
            }
            else if(CH1Display == 0){ 
                $("#ch1-button").css("opacity", 0);
                $("#myChart1").css("opacity", 0);
            }
        }
        if(response.couplingCH1_value || response.couplingCH1_value == 0){
            couplingValueCH1 = response.couplingCH1_value;
            // For the oscilloscope, 0 -> DC, 1 -> GND, 2 -> AC
            // For this app 0 -> AC, 1 -> GND, 2 -> DC
            if(couplingValueCH1 == 2){ couplingValueCH1 = 1; }
            else if(couplingValueCH1 == 1){ couplingValueCH1 = 0; }
            else if(couplingValueCH1 == 0){ couplingValueCH1 = 2; }
        }
        if(response.invertCH1_value || response.invertCH1_value == 0){
            invertValueCH1 = response.invertCH1_value;
        }
        if(response.probeCH1_value || response.probeCH1_value == 0){
            probeValueCH1 = response.probeCH1_value;
        }
        if(response.displayCH2_value || response.displayCH2_value == 0){
            CH2Display = response.displayCH2_value;
            if(firstTime == 0){
                if(CH2Display == 1){ 
                    resetMenuFlags();
                    CH2MenuFlag = 1; 
                    updateCH2Menu();
                }
                firstTime++;
            }
            if(CH2Display == 1){ 
                $("#ch2-button").css("opacity", 1);
                $("#myChart2").css("opacity", 1); 
            }
            else if(CH2Display == 0){ 
                $("#ch2-button").css("opacity", 0);
                $("#myChart2").css("opacity", 0); 
            }
        }
        if(response.couplingCH2_value || response.couplingCH2_value == 0){
            couplingValueCH2 = response.couplingCH2_value;
            // For the oscilloscope, 0 -> DC, 1 -> GND, 2 -> AC
            // For this app 0 -> AC, 1 -> GND, 2 -> DC
            if(couplingValueCH2 == 2){ couplingValueCH2 = 1; }
            else if(couplingValueCH2 == 1){ couplingValueCH2 = 0; }
            else if(couplingValueCH2 == 0){ couplingValueCH2 = 2; }
        }
        if(response.invertCH2_value || response.invertCH2_value == 0){
            invertValueCH2 = response.invertCH2_value;
        }
        if(response.probeCH2_value || response.probeCH2_value == 0){
            probeValueCH2 = response.probeCH2_value;
        }
        if(response.vppCH1_value){
            let value = response.vppCH1_value;
            if (value < 1){
                vppCH1 = response.vppCH1_value.toExponential(3).replace(/(-)/, "-0");
                vppCH1 = scientificNotationToReal(vppCH1);
            }
            else if (value >= 1){
                vppCH1 = response.vppCH1_value.toFixed(3);
            }
            amplitudeCH1_Value = vppCH1;
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Vpp"){
                    $("#menu-valueText11").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vpp"){
                    $("#menu-valueText21").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vpp"){
                    $("#menu-valueText31").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vpp"){
                    $("#menu-valueText43").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vpp"){
                    $("#menu-valueText52").text("1: " + vppCH1 +"V");
                }
            }
        }
        if(response.vppCH2_value){
            let value = response.vppCH2_value;
            if (value < 1){
                vppCH2 = response.vppCH2_value.toExponential(3).replace(/(-)/, "-0");
                vppCH2 = scientificNotationToReal(vppCH2);
            }
            else if (value >= 1){
                vppCH2 = response.vppCH2_value.toFixed(3);
            }
            /* Semelhante ao osciloscópio, ignorado por enquanto
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Vpp"){
                    $("#menu-valueText12").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vpp"){
                    $("#menu-valueText22").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vpp"){
                    $("#menu-valueText32").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vpp"){
                    $("#menu-valueText44").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vpp"){
                    $("#menu-valueText53").text("2: " + vppCH2 +"V");
                }
            }
            */
        }
        if(response.vrmsCH1_value){
            let value = response.vrmsCH1_value;
            if (value < 1){
                vrmsCH1 = response.vrmsCH1_value.toExponential(3).replace(/(-)/, "-0");
                vrmsCH1 = scientificNotationToReal(vrmsCH1);
            }
            else if (value >= 1){
                vrmsCH1 = response.vrmsCH1_value.toFixed(3);
            }
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Vrms"){
                    $("#menu-valueText11").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vrms"){
                    $("#menu-valueText21").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vrms"){
                    $("#menu-valueText31").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vrms"){
                    $("#menu-valueText43").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vrms"){
                    $("#menu-valueText52").text("1: " + vrmsCH1 +"V");
                }
            }
        }
        if(response.vrmsCH2_value){
            let value = response.vrmsCH2_value;
            if (value < 1){
                vrmsCH2 = response.vrmsCH2_value.toExponential(3).replace(/(-)/, "-0");
                vrmsCH2 = scientificNotationToReal(vrmsCH2);
            }
            else if (value >= 1){
                vrmsCH2 = response.vrmsCH2_value.toFixed(3);
            }
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Vrms"){
                    $("#menu-valueText12").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vrms"){
                    $("#menu-valueText22").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vrms"){
                    $("#menu-valueText32").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vrms"){
                    $("#menu-valueText44").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vrms"){
                    $("#menu-valueText53").text("2: " + vrmsCH2 +"V");
                }
            }
        }
        if(response.periodCH1_value){
            let value = response.periodCH1_value;
            if (value < 1){
                periodCH1 = response.periodCH1_value.toExponential(3).replace(/(-)/, "-0");
                periodCH1 = scientificNotationToReal(periodCH1);
            }
            else if (value >= 1){
                periodCH1 = response.periodCH1_value.toFixed(3);
            }
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Período"){
                    $("#menu-valueText11").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle2").text() == "Período"){
                    $("#menu-valueText21").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle3").text() == "Período"){
                    $("#menu-valueText31").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle4").text() == "Período"){
                    $("#menu-valueText43").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle5").text() == "Período"){
                    $("#menu-valueText52").text("1: " + periodCH1 +"s");
                }
            }
        }
        if(response.periodCH2_value){
            let value = response.periodCH2_value;
            if (value < 1){
                periodCH2 = response.periodCH2_value.toExponential(3).replace(/(-)/, "-0");
                periodCH2 = scientificNotationToReal(periodCH2);
            }
            else if (value >= 1){
                periodCH2 = response.periodCH2_value.toFixed(3);
            }
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Período"){
                    $("#menu-valueText12").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle2").text() == "Período"){
                    $("#menu-valueText22").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle3").text() == "Período"){
                    $("#menu-valueText32").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle4").text() == "Período"){
                    $("#menu-valueText44").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle5").text() == "Período"){
                    $("#menu-valueText53").text("2: " + periodCH2 +"s");
                }
            }
        }
        if(response.frequencyCH1_value){
            let value = response.frequencyCH1_value;
            if (value < 1){
                frequencyCH1 = response.frequencyCH1_value.toExponential(3).replace(/(-)/, "-0");
                frequencyCH1 = scientificNotationToReal(frequencyCH1);
            }
            else if (value >= 1){
                frequencyCH1 = response.frequencyCH1_value.toFixed(3); //Ver o que fazer neste caso
            }
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Frequência"){
                    $("#menu-valueText11").text("1: " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle2").text() == "Frequência"){
                    $("#menu-valueText21").text("1: " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle3").text() == "Frequência"){
                    $("#menu-valueText31").text("1: " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle4").text() == "Frequência"){
                    $("#menu-valueText43").text("1 " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle5").text() == "Frequência"){
                    $("#menu-valueText52").text("1: " + frequencyCH1 +"Hz");
                }
            }
        }
        if(response.frequencyCH2_value){
            let value = response.frequencyCH2_value;
            if (value < 1){
                frequencyCH2 = response.frequencyCH2_value.toExponential(3).replace(/(-)/, "-0");
                frequencyCH2 = scientificNotationToReal(frequencyCH2);
            }
            else if (value >= 1){
                frequencyCH2 = response.frequencyCH2_value.toFixed(3); //Ver o que fazer neste caso
            }
            if(measureFlag == 1){
                if($("#menu-textTitle1").text() == "Frequência"){
                    $("#menu-valueText12").text("2: " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle2").text() == "Frequência"){
                    $("#menu-valueText22").text("2: " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle3").text() == "Frequência"){
                    $("#menu-valueText32").text("2: " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle4").text() == "Frequência"){
                    $("#menu-valueText44").text("2 " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle5").text() == "Frequência"){
                    $("#menu-valueText53").text("2: " + frequencyCH2 +"Hz");
                }
            }
        }
        if(response.triggerType_value || response.triggerType_value == 0){ // TODO - Fazer com que as alterações apenas aconteçam caso o valor recebido pelo osciloscópio seja diferente do valor atual.
            trigger.type = response.triggerType_value;
            if(trigger.type == 0){ $("#trigger-type").text("EDGE").css("color", "#ffffff"); }
            else if(trigger.type == 1){ $("#trigger-type").text("VIDEO").css("color", "#ffffff"); }
            else if(trigger.type == 2){ $("#trigger-type").text("PULSE").css("color", "#ffffff"); }
            else if(trigger.type == 3){ $("#trigger-type").text("DELAY").css("color", "#ffffff"); }
        }
        if(response.triggerSource_value || response.triggerSource_value == 0){
            trigger.source = response.triggerSource_value;
            if(trigger.source == 0){ $("#trigger-source").text("CH1").css("color", "#fbff00"); }
            if(trigger.source == 1){ $("#trigger-source").text("CH2").css("color", "#00eaff"); }
            if(trigger.source == 4){ $("#trigger-source").text("EXT").css("color", "#ff0000"); }
            if(trigger.source == 5){ $("#trigger-source").text("LINE").css("color", "#ff0000"); } // TODO - O osciloscópio manda esta opção como 2, ver como distinguir do CH2.
        }
        if(response.data_header_CH1){
            let value = response.data_header_CH1.data;
            let decString = [];
            decString[0] = value[6];
            decString[1] = value[7];
            decString[2] = value[8];
            decString[3] = value[9];
            timeIntervalCH1 = hexToValue(decString);
            numberOfPointsCH1 = (10*horizontalScale_Value)/timeIntervalCH1;
        }
        if(response.data_wave_CH1){
            if(response.data_wave_CH1.data){
                let channel = 1;
                let value = response.data_wave_CH1.data;
                let j=0, k=0;
                dir = [];
                val = [];
                for(let i = 0; i < value.length; i++){
                    if(i%2 == 0){
                        dir[j] = value[i];
                        j++;
                    }
                    else if(i%2 == 1){
                        val[k] = value[i];
                        k++;
                    }
                }
                updateChartReal(channel,val,dir);
            }
        }
        if(response.data_header_CH2){
            let value = response.data_header_CH2.data;
            let decString = [];
            decString[0] = value[6];
            decString[1] = value[7];
            decString[2] = value[8];
            decString[3] = value[9];
            timeIntervalCH2 = hexToValue(decString);
            numberOfPointsCH2 = (10*horizontalScale_Value)/timeIntervalCH2;
        }
        if(response.data_wave_CH2){
            if(response.data_wave_CH2.data){
                let channel = 2;
                let value = response.data_wave_CH2.data;
                let j=0, k=0;
                for(let i = 0; i < value.length; i++){
                    if(i%2 == 0){
                        dir[j] = value[i];
                        j++;
                    }
                    else if(i%2 == 1){
                        val[k] = value[i];
                        k++;
                    }
                }
                updateChartReal(channel,val,dir);
            }
        }
        if(CH1MenuFlag == 1){ updateCH1Menu(); }
        if(CH2MenuFlag == 1){ updateCH2Menu(); }
        if(measureAllCH1Flag == 1){ measureAllCH1(); }
        if(measureAllCH2Flag == 1){ measureAllCH2(); }
        if(measureFlag == 1){ measure(); }
        if(trigger.menu == 1){ updateTriggerMenu1(); }
    }else{
        alert("Error! " + response.status);
    }
}