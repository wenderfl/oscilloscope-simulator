//* --- This file contains all the variables used in the frontend --- //

//? ------------------- Consts lists ------------------- //
const verticalScaleList = ["2.000E-3", "5.000E-3", "1.000E-2", "2.000E-2", "5.000E-2", "1.000E-1", "2.000E-1", "5.000E-1", "1.000E+0", "2.000E+0", "5.000E+0"];
const horizontalScaleList = ["1.000E-9", "2.500E-9", "5.000E-9", "1.000E-8", "2.500E-8", "5.000E-8", "1.000E-7", "2.500E-7", "5.000E-7", "1.000E-6", "2.500E-6", "5.000E-6", "1.000E-5", "2.500E-5", "5.000E-5", "1.000E-4", "2.500E-4", "5.000E-4", "1.000E-3", "2.500E-3", "5.000E-3", "1.000E-2", "2.500E-2", "5.000E-2", "1.000E-1", "2.500E-1", "5.000E-1", "1.000E+0", "2.500E+0", "5.000E+0", "1.000E+1"];

//? ------------------- Variables ------------------- //

const interval = {
    data: 0,
    ch1: 0,
    ch1Flag: 0,
    ch2: 0,
    ch2Flag: 0,
    waves: 0,
}

const horizontal = {
}
const ch1 = {
    //* Menu related 
    menu: 0,
    coupling: 0,
    invert: 0,
    probe: 0,
    //* Measure related
    vmin: 0,
    vmax: 0,
    vavg: 0,
    vrms: 0,
    vamp: 0,
    vpp: 0,
    freq: 0,
    period: 0,
    //* Waveform information
    display: 0,
    scale: 6,
    data: [],
    base: [],
    time: [], // Ver que variável é esta
}
const ch2 = {
    //* Menu related 
    menu: 0,
    coupling: 0,
    invert: 0,
    probe: 0,
    //* Measure related
    vmin: 0,
    vmax: 0,
    vavg: 0,
    vrms: 0,
    vamp: 0,
    vpp: 0,
    freq: 0,
    period: 0,
    //* Waveform information
    display: 0,
    scale: 6,
    data: [],
    base: [],
    time: [],
}
const trigger = { //* Trigger menu related
    menu: 0,
    type: 0,
    source: 0,
    level: 0,
    position: 0,
    slope: 0,
    coupling: 0,
    mode: 0,
    standard: 0,
    polarity: 0,
    rejection: 0,
    noiseRej: 0,
}
const measure = { //* Measure menu related
    menu: 0,
    displayAllCH1: 0,
    displayAllCH2: 0,
    source: 0,
    voltType: 0,
    timeType: 0,
}
const flag = {
    offcanvas: 0,
    power: 0,
}

let CH1ExtVavg = 0;
let CH2ExtVavg = 0;
let CH1ExtFlag = 1;
let CH2ExtFlag = 1;
let CH1ExtSignalFlag = 0;
let CH2ExtSignalFlag = 0;