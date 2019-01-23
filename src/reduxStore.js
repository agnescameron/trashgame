import { createStore, combineReducers } from 'redux';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { appReducer} from './reducer';

let persistOptions = {
  key: 'appRoot',
  storage: storage,
};

let store = createStore(persistReducer(persistOptions, combineReducers({
  appReducer,
})));
//let persistor = persistStore(store);
let persistor = persistStore(store);
export {store, persistor};
