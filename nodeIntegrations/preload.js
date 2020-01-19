const {
    ipcRenderer
} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    // let dd = require('robotjs');
    // this value will be taken from a json file
    const colors = {
        foreground: "#E1E1E1",
        background: "#000000"
    }
    //ONLOAD CHANGES
    changeColor(colors);
    changeInputsValue(colors);
    changeSVGColors(colors);
    // 
    // Listen fro when the users click the fav button
    const _FAV = document.getElementById('menu-star');
    const _ICONS_PATH = ["star", "star-filled"];
    let checked = false; //get this from the json file
    _FAV.addEventListener('click', () => {
        checked = !checked;
        _FAV.src = `../ico/${_ICONS_PATH[+checked]}.svg`;
    });
    // 
    // Get Contrast Ratio
    const _CONTRAST_RATIO = getContrastRatio(colors);
    //Set Score according to contrast ratio
    setScore(_CONTRAST_RATIO);
    // 
    // Open a color picker when the Feather is clicked
    // Change color IRL
    let picker;
    document.getElementById('eyeDrope-top').addEventListener('click', () => {
        picker = 'background';
        getColor();
    });
    document.getElementById('eyeDrope-bot').addEventListener('click', () => {
        picker = 'foreground';
        getColor();
    });
    ipcRenderer.on('getColor', (event, color) => {
        let pos = 0;
        if (picker == 'foreground') pos = 1;
        document.getElementsByClassName('clr-input')[pos].value = "#" + color;
        colors.background = document.getElementsByClassName('clr-input')[0].value;
        colors.foreground = document.getElementsByClassName('clr-input')[1].value;
        // 
        changeColor(colors);
        changeSVGColors(colors);
        // 
        setScore(getContrastRatio(colors));
    });
});
// Change root colors
function changeColor(colors) {
    for (let index = 0; index < Object.keys(colors).length; index++) {
        document.documentElement.style.setProperty(`--${Object.keys(colors)[index]}`, colors[Object.keys(colors)[index]]);
    }
}
// Get svg color Filter from HEX
function getSVGFilter(colors) {
    const svgColor = require('../app/js/svgColor');
    let svgFilters = {
        foregroundFilter: "",
        backgroundFilter: ""
    }
    for (let index = 0; index < Object.keys(colors).length; index++) {
        svgFilters[Object.keys(svgFilters)[index]] = svgColor.execute(colors[Object.keys(colors)[index]]).filter;
    }
    return svgFilters;
}
// Change SVG-icons color
function changeSVGColors(colors) {
    filter = getSVGFilter(colors);
    changeColor(filter);
}
// Change the Input Values according to the color
function changeInputsValue(colors) {
    const inputs = document.getElementsByClassName('clr-input');
    inputs[0].value = colors.background;
    inputs[1].value = colors.foreground;
}
// This function returns the contrast ratio between 2 colors
function getContrastRatio(colors) {
    const TinyColor = require('tinycolor2');
    // 
    let _LUMINANCE = [TinyColor(colors.foreground).getLuminance(), TinyColor(colors.background).getLuminance()];
    _LUMINANCE = getDarkLight(_LUMINANCE, colors);
    return (_LUMINANCE[0] + 0.05) / (_LUMINANCE[1] + 0.05);
}
// Determin the lighter and the darker colors from the paramas
function getDarkLight(luminance, colors) {
    const _SWITCH = luminance[0] > luminance[1] ? false : true;
    if (_SWITCH) {
        let placeholder = colors.foreground;
        colors.foreground = colors.background;
        colors.background = placeholder;
        // 
        luminance.reverse();
        // 
        changeColor(colors);
        changeInputsValue(colors);
        changeSVGColors(colors);
    }
    return luminance;
}
// Function that takes The contrast ratio and make judgment
function setScore(contrast) {
    let res = [];
    // 
    if (contrast.toFixed(2) >= 7) {
        res.push("Great");
        res.push("AAA");
    } else if (contrast.toFixed(2) >= 4.5) {
        res.push("Pass");
        res.push("AA");
    } else {
        res.push("Fail");
        res.push("");
    }
    // 
    document.getElementById('preview-class').innerText = res[0];
    document.getElementById('preview-score').innerText = `${contrast.toFixed(2)} ${res[1]}`;
}
// Get Color from Mouse Pos
function getColor() {
    const robot = require("robotjs");
    const _MOUSE = robot.getMousePos();
    ipcRenderer.send('test', [_MOUSE.x, _MOUSE.y]);
}