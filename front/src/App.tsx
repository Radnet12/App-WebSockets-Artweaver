
// Components
import { Canvas } from "./components/common/Canvas/Canvas";
import { SettingBar } from "./components/common/SettingBar/SettingBar";
import { Toolbar } from "./components/common/Toolbar/Toolbar";

export const App = () => {
    return (
        <div className="wrapper">
            <Toolbar />
            <SettingBar />
            <Canvas />
        </div>
    );
};
