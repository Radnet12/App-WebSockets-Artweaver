export type CanvasReducerState = {
    canvas: any;
    undoList: Array<string>;
    redoList: Array<string>;
    username: string;
    socket: null | WebSocket;
    sessionId: string | null;
};
