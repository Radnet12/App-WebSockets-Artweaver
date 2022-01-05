// Redux
import { useDispatchedAction } from "../../../hooks/useDispatchedActions";

// Styles
import "./SettingBar.scss";

export const SettingBar = () => {
    // Dispatch
    const { setLineWidth, setStrokeColor } = useDispatchedAction();

    return (
        <div className="toolbar toolbar--settings">
            <div className="settings__input">
                <label>
                    <span>Толщина линии</span>
                    <input
                        onChange={(e) => setLineWidth(+e.target.value)}
                        type="number"
                        min={1}
                        max={50}
                        defaultValue={1}
                    />
                </label>
            </div>
            <div className="settings__input">
                <label>
                    <span>Цвет обводки</span>
                    <input
                        onChange={(e) => setStrokeColor(e.target.value)}
                        type="color"
                    />
                </label>
            </div>
        </div>
    );
};
