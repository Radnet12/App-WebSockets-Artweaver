import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { ToolReducerState } from "./ToolReducerTypes";

const initialState: ToolReducerState = {
    tool: null,
};

const ToolReducer = createSlice({
    name: "tool",
    initialState,
    reducers: {
        setTool(state, action: PayloadAction<any | null>) {
            state.tool = action.payload;
        },
        setFillColor(state, action: PayloadAction<string>) {
            state.tool.fillColor = action.payload;
        },
        setStrokeColor(state, action: PayloadAction<string>) {
            state.tool.strokeColor = action.payload;
        },
        setLineWidth(state, action: PayloadAction<number>) {
            state.tool.lineWidth = action.payload;
        },
    },
});

export const ToolReducerActions = { ...ToolReducer.actions };
export default ToolReducer.reducer;
