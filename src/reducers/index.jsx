import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import alertaReducer from "./alertaReducer";

export default combineReducers({
    productos : ProductReducer,
    alerta : alertaReducer
})
