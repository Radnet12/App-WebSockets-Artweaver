import { useCallback, useEffect, useRef, useState } from "react";

// Redux
import { useDispatchedAction } from "../../../hooks/useDispatchedActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// Libs
import { Modal, Button, Input } from "antd";
import { useParams } from "react-router-dom";

// Tools
import { Brush } from "../../../tools/Brush";
import { Rect } from "../../../tools/Rect";

// Styles
import "./Canvas.scss";
import axios from "axios";

export const Canvas = () => {
    // **Props
    const { id } = useParams<{ id: string }>();

    // **Local State
    const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

    // **Redux State
    const { username } = useTypedSelector((state) => state.canvas);

    // Dispatch
    const {
        setCanvas,
        setTool,
        pushToUndo,
        setUsername,
        setSocket,
        setSessionId,
    } = useDispatchedAction();

    // **Ref
    const inputRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);

    const drawHandler = (msg: any) => {
        const figure = msg.figure;
        const ctx = canvasRef.current?.getContext("2d");

        switch (figure.type) {
            case "brush": {
                Brush.draw(ctx, figure.x, figure.y);
                break;
            }
            case "rect": {
                Rect.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.width,
                    figure.height,
                    figure.color
                );
                break;
            }
            case "finish": {
                ctx?.beginPath();
                break;
            }
        }
    };

    const createWebSocket = useCallback(() => {
        if (username.length > 0 && canvasRef.current) {
            const socket = new WebSocket("ws://localhost:5000/");

            setSocket(socket);
            setSessionId(id);

            setTool(new Brush(canvasRef.current, socket, id));

            socket.onopen = () => {
                console.log("Connected");

                socket.send(
                    JSON.stringify({
                        id,
                        username,
                        method: "connection",
                    })
                );

                socket.onmessage = (event: MessageEvent) => {
                    let msg = JSON.parse(event.data);

                    switch (msg.method) {
                        case "connection": {
                            console.log(
                                `Пользователь ${msg.username} был подключен!`
                            );

                            break;
                        }
                        case "draw": {
                            drawHandler(msg);
                            break;
                        }
                    }
                };
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, id]);

    const modalHandler = (state: boolean) => {
        if (inputRef.current?.state.value.length > 0) {
            setUsername(inputRef.current?.state.value);
            setIsModalVisible(state);
        }
    };

    const mouseDownHandler = () => {
        if (canvasRef.current?.toDataURL()) {
            pushToUndo(canvasRef.current.toDataURL());
        }
    };

    const mouseUpHandler = () => {
        axios
            .post(`http://localhost:5000/image?id=${id}`, {
                img: canvasRef.current.toDataURL(),
            })
            .then((res) => console.log(res));
    };

    // Creating webSocket
    useEffect(() => {
        createWebSocket();
    }, [username, id, createWebSocket]);

    useEffect(() => {
        if (canvasRef.current) {
            setCanvas(canvasRef.current);
        }
        axios.get(`http://localhost:5000/image?id=${id}`).then((res) => {
            const ctx = canvasRef.current.getContext("2d");
            const img = new Image();
            img.src = res.data;

            img.onload = () => {
                ctx.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                ctx.drawImage(
                    img,
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                ctx.stroke();
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="canvas">
            <Modal
                title="Введите имя"
                visible={isModalVisible}
                closeIcon={() => null}
                centered
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => modalHandler(false)}
                    >
                        Подтвердить
                    </Button>,
                ]}
            >
                <Input ref={inputRef} placeholder="Введите имя" />
            </Modal>
            <canvas
                ref={canvasRef}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
                width={600}
                height={400}
            ></canvas>
        </div>
    );
};
