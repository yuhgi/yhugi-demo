import {delay} from 'redux-saga';
import {takeEvery,put,all,call,takeLatest,select,take} from 'redux-saga/effects';
import Api from './api';

function* loginFlow(){
    while(true){
        const {payload:{user,password}} = yield take('LOGIN_REQUEST');
        const token = yield call(authorize,user,password);
        if(token){
            yield call(Api.storeItem,{token});
            yield take('LOGOUT');
            debugger
            yield call(Api.clearItem,'token');
        }
    }
}

function* authorize(user,password) {
    try{
        const token = yield call(Api.authorize,user,password);
        yield put({
            type:'LOGIN_SUCCESS',
            token
        });
        return token;
    }catch(error){
        yield put({type:'LOGIN_ERROR',error});
    }
}

function* watchAndLog(getState){
    yield takeEvery('*',function* logger(action){
        const state = yield select();
        console.log('action',action);
        console.log('state after',state);
    });
}

function* fetchData(action){
    try{
        const data = yield call(Api.fetchUser,action.payload.url);
        yield put({type:'FETCH_SUCCESS',data});
    }catch(error){
        yield put({type:'FETCH_FAIL',error});
    }
}

function* watchFetchData(){
    yield takeLatest('FETCH_REQUEST',fetchData);
}


function* incrementAsync(){
    yield delay(1000);
    yield put({type:'INCREMENT'});
}

function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC',incrementAsync);
}

function* helloSaga(){
    console.log('Hello sagas!');
}

export default function* rootSaga(){
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchFetchData(),
        loginFlow()
    ])
}