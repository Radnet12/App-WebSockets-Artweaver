// Redux
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// Actions
import { AllActions } from "../store/reducers/AllActions";

export const useDispatchedAction = () => {
    const dispatch = useDispatch();

    return bindActionCreators(AllActions, dispatch);
};
