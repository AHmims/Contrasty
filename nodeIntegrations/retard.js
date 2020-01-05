window.addEventListener('DOMContentLoaded', () => {
    const {
        ipcRenderer
    } = require('electron');
    window.addEventListener('mousemove', (pos) => {
        ipcRenderer.send('moved', [pos.screenX - 45, pos.screenY - 45]);
    });
});