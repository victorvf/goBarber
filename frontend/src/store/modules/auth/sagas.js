import { all, call, put, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, '/session', { email, password });

        const { token, user } = response.data;

        if (!user.provider) {
            toast.error('user has not permission');

            return;
        }

        yield put(signInSuccess(token, user));

        history.push('/dashboard');
    } catch (err) {
        toast.error('authentication fails, check your data');

        yield put(signFailure());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
