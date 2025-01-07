import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import gamesReducer from "./gamesReducer";
import resultReducer from "./resultReducer";
import gameReducer from "./gameReducer";
import actionsReducer from "./actionsReducer";
import attackerReducer from "./attackerReducer";
import variableReducer from "./variableReducer";
import attackerGlobalReducer from "./attackerGlobalReducer";
import blockerReducer from "./blockerReducer";
import descartCardReducer from "./descartCardReducer";

const rootReducer = combineReducers({
    user: userReducer,
    games: gamesReducer,
    result: resultReducer,
    game: gameReducer,
    action: actionsReducer,
    attacker: attackerReducer,
    variables: variableReducer,
    attackerGlobal: attackerGlobalReducer,
    blocker: blockerReducer,
    descart: descartCardReducer,
});

const store = configureStore({
    reducer: rootReducer,
})

export default store