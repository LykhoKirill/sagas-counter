import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { handleActions, createAction } from 'redux-actions'

import App from './App'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const actions = {
    setCount: createAction('SET_COUNT'),
    getCount: createAction('GET_COUNT'),
    up: createAction('UP'),
    down: createAction('DOWN'),
}

const reducer = handleActions({
    [actions.setCount]: (state, {payload: count}) => ({ ...state, count})
}, {
    count: 0
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware
        )
    ),
)

sagaMiddleware.run(rootSaga)

render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))
