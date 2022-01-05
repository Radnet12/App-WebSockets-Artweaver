// Libs
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Components
import { Canvas } from "./components/common/Canvas/Canvas";
import { SettingBar } from "./components/common/SettingBar/SettingBar";
import { Toolbar } from "./components/common/Toolbar/Toolbar";

export const App = () => {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/:id">
                        <Toolbar />
                        <SettingBar />
                        <Canvas />
                    </Route>
                    <Redirect to={`f${(+new Date()).toString(16)}`} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};
