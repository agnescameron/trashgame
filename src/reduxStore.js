import { createStore, combineReducers, applyMiddleware } from 'redux';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import { appReducer} from './reducer';

let persistOptions = {
  key: 'appRoot',
  storage: storage,
};

let store = createStore(persistReducer(persistOptions, combineReducers({
  appReducer,
}), { 	endgame: true,
		collectionRateHistory: [],
        recyclingRateHistory: [],
        recyclingQualityHistory: [],
        leftoverWasteHistory: [],
        landfillWasteHistory: [], 
    }), applyMiddleware(thunk));
//let persistor = persistStore(store);
let persistor = persistStore(store);
export {store, persistor};
