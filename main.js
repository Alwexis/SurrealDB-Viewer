const { app, BrowserWindow, screen, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const WebSocket = require('ws');
const { exec } = require('child_process');

function onReady() {
    const { width, height } = screen.getPrimaryDisplay().size

    let window = new BrowserWindow({
        width,
        height,
        fullscreenable: true,
        autoHideMenuBar: true,
        simpleFullscreen: true,
        resizable: false,
        icon: path.join(__dirname, '/src/electron/surrealdb-icon.png')
    });
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/surreal-db-viewer/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Crear el servidor WebSocket
    const wss = new WebSocket.Server({ port: 3001 });

    // Evento de conexión de WebSocket
    wss.on('connection', (ws) => {
        console.log('Cliente conectado');

        // Evento de mensaje recibido desde el cliente WebSocket
        ws.on('message', (message) => {
            let data = JSON.parse(message);
            if (data.type && data.type === 'exec-cmd') {
                let cmd = data.cmd;
                exec(cmd, (err, stdout, stderr) => {
                    if (err) return;
                    ws.send(JSON.stringify({ type: 'exec-cmd', stdout, stderr }));
                    return;
                });
            }
            console.log('Mensaje recibido:', message.toString());
            ws.send('Respuesta del servidor: ' + message);
        });

        // Evento de cierre de la conexión WebSocket
        ws.on('close', () => {
            console.log('Cliente desconectado');
        });
    });
}

app.on('ready', onReady);