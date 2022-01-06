// Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const PORT = process.env.port || "6000";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

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
            case "draw": {
                broadcastConnection(ws, msg);
                break;
            }
        }
    });
});

app.get("/image", (req, res) => {
    try {
        const file = fs.readFileSync(
            path.resolve(__dirname, "files", `${req.query.id}.jpg`)
        );

        const data = "data:image/png;base64," + file.toString("base64");

        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Error");
    }
});

app.post("/image", (req, res) => {
    try {
        const body = req.body;
        const imgBase64 = body.img.replace("data:image/png;base64,", "");

        fs.writeFileSync(
            path.resolve(__dirname, "files", `${req.query.id}.jpg`),
            imgBase64,
            "base64"
        );
        return res.status(200).json({ message: "Загружено!" });
    } catch (e) {
        console.log(e);
        return res.status(500).json("Error");
    }
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
};
