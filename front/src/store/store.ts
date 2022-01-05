import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Reducers
import ToolReducer from "./reducers/ToolReducer/ToolReducer";
import CanvasReducer from "./reducers/CanvasReducer/CanvasReducer";

const rootReducer = combineReducers({
    tool: ToolReducer,
    canvas: CanvasReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

// Получаем ТИП rootReducer через нативную функцию typeScript ReturnType
export type RootState = ReturnType<typeof rootReducer>;

// Получаем ТИП setupStore через нативную функцию typeScript ReturnType
export type AppStore = ReturnType<typeof setupStore>;

// Получаем тип dispatcha-а
export type AppDispatch = AppStore["dispatch"];