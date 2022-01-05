// Actions
import { CanvasReducerActions } from "./CanvasReducer/CanvasReducer";
import { ToolReducerActions } from "./ToolReducer/ToolReducer";

export const AllActions = { ...ToolReducerActions, ...CanvasReducerActions };
