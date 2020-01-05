window.addEventListener('DOMContentLoaded', () => {
    let rr = require('tinycolor2');
    // let dd = require('robotjs');
    // 
    const colors = {
        foreground: "#E7C296",
        background: "#29344b"
    }
    //
    changeSVGColors(colors);
    // 
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
// function SVG icons color
function changeSVGColors(colors) {
    filter = getSVGFilter(colors);
    changeColor(filter);
}