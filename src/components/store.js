import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "../features/graph/graphSlice"
import editorReducer from "../features/editor/editorSlice";
import cjmlReducer from "../features/editor/editorSlice";

export const store = configureStore({
    reducer: {
        graph: graphReducer,
        editor: editorReducer,
        cjml: cjmlReducer
    }
});
