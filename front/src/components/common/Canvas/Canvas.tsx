import { useEffect, useRef } from "react";

// Redux
import { useDispatchedAction } from "../../../hooks/useDispatchedActions";

// Tools
import { Brush } from "../../../tools/Brush";

// Styles
import "./Canvas.scss";

export const Canvas = () => {
    // Dispatch
    const { setCanvas, setTool, pushToUndo } = useDispatchedAction();

    // **Ref
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const mouseDownHandler = () => {
        if (canvasRef.current?.toDataURL()) {
            pushToUndo(canvasRef.current.toDataURL());
        }
    };

    useEffect(() => {
        if (canvasRef.current) {
            setCanvas(canvasRef.current);
            setTool(new Brush(canvasRef.current));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="canvas">
            <canvas
                onMouseDown={mouseDownHandler}
                ref={canvasRef}
                width={600}
                height={400}
            ></canvas>
        </div>
    );
};
