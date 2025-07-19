import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import loadingReducer from "../features/loadingSlice";
import creatorDashboardReducer from "../features/creatorDashboardSlice";
import managerDashboardReducer from "../features/managerDashboardSlice";
import agencyManagerReducer from "../features/agencyManagerSlice";
import eventsReducer from "../features/eventsSlice";
import ticketsReducer from "../features/ticketsSlice";
import bonusReducer from "../features/bonusSlice";
// import clubReducer from "../features/clubSlice";
// import userReducer from "../features/userSlice";
// import matchReducer from "../features/matchSlice";
// import chatReducer from "../features/chatSlice";
// import storeReducer from "../features/storeSlice";

// Persist only specific reducers
const persistConfig = {
  key: "root", // Change the key to "root" to persist multiple reducers
  storage,
  whitelist: ["auth"], // Add "user" to persist user data
};

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  creatorDashboard: creatorDashboardReducer,
  managerDashboard: managerDashboardReducer,
  agencyManager: agencyManagerReducer,
  events: eventsReducer,
  tickets : ticketsReducer,
  bonus: bonusReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor }; 

