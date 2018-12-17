import { createStore, applyMiddleware } from 'redux';
import AppReducer from '../reducer/AppRducer';
import { appEpic } from '../epics/appEpic';
import { createEpicMiddleware } from 'redux-observable';


const epicMiddleware = createEpicMiddleware();

const  store = createStore(AppReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(appEpic);

export default store;
