import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { eventReducer } from './event/event_slice'
import { globalReducer } from './global/global_slice'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [], // định nghĩa các slice được phép duy trì qua mỗi lần f5 trình duyệt
};

const reducers = combineReducers({
    event: eventReducer,
    global: globalReducer
});

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
