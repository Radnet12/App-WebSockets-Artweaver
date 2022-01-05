// Modules
require("dotenv").config();
const express = require("express");

const PORT = process.env.port || "6000";

const app = express();

const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

app.ws("/", (ws, res) => {
    console.log("Соединение установлено!");

    ws.send("Вы успешко подключились!");
    ws.on("message", (msg) => {
        msg = JSON.parse(msg);

        switch (msg.method) {
            case "connection": {
                connectionHandler(ws, msg);
                break;
            }
        }
    });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(`Пользователь ${msg.username} подключен!`);
        }
    });
};
