window.addEventListener('DOMContentLoaded', () => {
    const robot = require("robotjs");
    const {
        ipcRenderer
    } = require('electron');
    window.addEventListener('mousemove', (pos) => {
        var mouse = robot.getMousePos();
        var hex = robot.getPixelColor(mouse.x, mouse.y);
        ipcRenderer.send('moved', [pos.screenX - 40, pos.screenY - 40]);
        ipcRenderer.send('colorUpdated', hex);
    });
    window.addEventListener('click', () => {
        ipcRenderer.send('close');
    });
});