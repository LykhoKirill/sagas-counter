import { fork, takeEvery, call, put } from 'redux-saga/effects'

import { actions } from './index'
import { getCount, updateCount } from './api'

export function * rootSaga() {
    yield fork(watchGetCount)
    yield fork(watchChangeCount)
}

function * watchGetCount() {
    yield takeEvery(actions.getCount, workerGetCount)
}

function * workerGetCount() {
    const { count } = yield call(getCount)
    yield put(actions.setCount(count))
}

function * watchChangeCount() {
    yield takeEvery([actions.up, actions.down], workerChangeCount)
}

function * workerChangeCount({ type, payload: currentCount }) {
    let updatedCount
    switch (type) {
        case actions.up().type:
            updatedCount = yield call(updateCount, {
                count: currentCount + 1
            })
        break
        case actions.down().type:
            updatedCount = yield call(updateCount, {
                count: currentCount - 1
            })
        break
    }
    const { count } = updatedCount
    yield put(actions.setCount(count))
}