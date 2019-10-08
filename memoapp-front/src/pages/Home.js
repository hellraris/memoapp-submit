import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import styled from 'styled-components';

import reducer from '../reducers';
import rootSaga from '../sagas/index';
import MemoDetailView from '../components/MemoDetailView';
import LabelListView from '../components/LabelListView';
import MemoListView from '../components/MemoListView';
import AppLayout from '../components/AppLayout';

const Overlay = styled.div`
  display: flex;
  height: calc(100% - 70px);
  margin-top: 10;
`;

const persistConfig = {
  key: 'root',
  storage
};

const enhancedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(...middlewares))
  : compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
const store = createStore(enhancedReducer, enhancer);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

const Home = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppLayout>
          <Overlay>
            <LabelListView />
            <MemoListView />
            <MemoDetailView />
          </Overlay>
        </AppLayout>
      </PersistGate>
    </Provider>
  )
};

export default Home;