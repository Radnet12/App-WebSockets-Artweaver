// Styles
import { Button } from "../../ui/Button/Button";
import "./Toolbar.scss";

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <Button
                toolName="brush"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/brush.svg"
                alt="Кисточка"
                aria-label="Взять инструмент кисточку"
            />
            <Button
                toolName="rect"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/rect.svg"
                alt="Прямоугольник"
                aria-label="Взять инструмент прямоугольник"
            />
            <Button
                toolName="circle"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/circle.svg"
                alt="Круг"
                aria-label="Взять инструмент круг"
            />
            <Button
                toolName="eraser"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/eraser.svg"
                alt="Ластик"
                aria-label="Взять инструмент ластик"
            />
            <Button
                toolName="line"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/line.svg"
                alt="Линия"
                aria-label="Взять инструмент линия"
            />
            <input className="tool tool--palette" type="color" />
            <Button
                toolName="undo"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/undo.svg"
                alt="Назад"
                aria-label="Отменить предыдущие действие"
            />
            <Button
                toolName="redo"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/redo.svg"
                alt="Вперед"
                aria-label="Вернуть следующие действие"
            />
            <Button
                toolName="save"
                imgWidth={25}
                imgHeight={25}
                imgSrc="./img/icons/save.svg"
                alt="Сохранить"
                aria-label="Сохранить рисунок"
            />
        </div>
    );
};
