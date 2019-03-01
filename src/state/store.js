import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pokemonReducer from './pokemon-reducer';

const persistConfig = {
  key: 'pokemon-app',
  storage,
};

const reducers = combineReducers({
  pokemonReducer,
});

const persistedReducers = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducers, undefined);
const persistor = persistStore(store);

export default () => ({ store, persistor });