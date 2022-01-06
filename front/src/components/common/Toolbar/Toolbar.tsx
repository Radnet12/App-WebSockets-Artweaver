// Redux
import { ChangeEvent } from "react";
import { useDispatchedAction } from "../../../hooks/useDispatchedActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// Tools
import { Brush } from "../../../tools/Brush";
import { Circle } from "../../../tools/Circle";
import { Eraser } from "../../../tools/Eraser";
import { Line } from "../../../tools/Line";
import { Rect } from "../../../tools/Rect";

// Components
import { Button } from "../../ui/Button/Button";

// Styles
import "./Toolbar.scss";

export const Toolbar = () => {
    // **Redux state
    const { canvas, redoList, undoList, socket, sessionId } = useTypedSelector(
        (state) => state.canvas
    );

    // Dispatch
    const {
        setFillColor,
        setStrokeColor,
        removeFromUndo,
        pushToRedo,
        removeFromRedo,
        pushToUndo,
    } = useDispatchedAction();

    const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
        setFillColor(e.target.value);
        setStrokeColor(e.target.value);
    };

    const undo = () => {
        let ctx = canvas.getContext("2d");

        if (undoList.length > 0) {
            let dataUrl = undoList[undoList.length - 1];
            pushToRedo(canvas.toDataURL());
            removeFromUndo();

            let img = new Image();

            if (dataUrl) {
                img.src = dataUrl;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
            }
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const redo = () => {
        let ctx = canvas.getContext("2d");

        if (redoList.length > 0) {
            let dataUrl = redoList[redoList.length - 1];

            pushToUndo(canvas.toDataURL());
            removeFromRedo();

            let img = new Image();

            if (dataUrl) {
                img.src = dataUrl;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
            }
        }
    };

    const toolHandler = (tool: any) => {
        if (socket) {
            new tool(canvas, socket, sessionId);
        }
    };

    const downloadHandler = () => {
        const dataUrl = canvas.toDataURL();

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `${sessionId}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="toolbar">
            <Button
                toolName="brush"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/brush.svg"
                alt="Кисточка"
                aria-label="Взять инструмент кисточку"
                onClick={() => toolHandler(Brush)}
            />
            <Button
                toolName="rect"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/rect.svg"
                alt="Прямоугольник"
                aria-label="Взять инструмент прямоугольник"
                onClick={() => toolHandler(Rect)}
            />
            <Button
                toolName="circle"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/circle.svg"
                alt="Круг"
                aria-label="Взять инструмент круг"
                onClick={() => toolHandler(Circle)}
            />
            <Button
                toolName="eraser"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/eraser.svg"
                alt="Ластик"
                aria-label="Взять инструмент ластик"
                onClick={() => toolHandler(Eraser)}
            />
            <Button
                toolName="line"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/line.svg"
                alt="Линия"
                aria-label="Взять инструмент линия"
                onClick={() => toolHandler(Line)}
            />
            <input
                onChange={changeColor}
                className="tool tool--palette"
                type="color"
            />
            <Button
                toolName="undo"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/undo.svg"
                alt="Назад"
                aria-label="Отменить предыдущие действие"
                onClick={undo}
            />
            <Button
                toolName="redo"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/redo.svg"
                alt="Вперед"
                aria-label="Вернуть следующие действие"
                onClick={redo}
            />
            <Button
                toolName="save"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/save.svg"
                alt="Сохранить"
                aria-label="Сохранить рисунок"
                onClick={downloadHandler}
            />
        </div>
    );
};
