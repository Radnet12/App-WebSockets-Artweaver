import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { CanvasReducerState } from "./CanvasReducerTypes";

const initialState: CanvasReducerState = {
    canvas: null,
    redoList: [],
    undoList: [],
    username: "",
    socket: null,
    sessionId: null,
};

const CanvasReducer = createSlice({
    name: "tool",
    initialState,
    reducers: {
        setCanvas(state, action: PayloadAction<any>) {
            state.canvas = action.payload;
        },
        pushToUndo(state, action: PayloadAction<string>) {
            state.undoList.push(action.payload);
        },
        removeFromUndo(state) {
            state.undoList.pop();
        },
        pushToRedo(state, action: PayloadAction<string>) {
            state.redoList.push(action.payload);
        },
        removeFromRedo(state) {
            state.redoList.pop();
        },
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setSessionId(state, action: PayloadAction<string>) {
            state.sessionId = action.payload;
        },
        setSocket(state, action: PayloadAction<WebSocket | null>) {
            state.socket = action.payload;
        }
    },
});

export const CanvasReducerActions = { ...CanvasReducer.actions };
export default CanvasReducer.reducer;
