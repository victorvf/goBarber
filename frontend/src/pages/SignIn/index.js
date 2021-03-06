import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
    const loading = useSelector((state) => state.auth.loading);

    const dispatch = useDispatch();

    const handleSubmit = useCallback(
        async ({ email, password }) => {
            dispatch(signInRequest(email, password));
        },
        [dispatch]
    );

    return (
        <>
            <img src={logo} alt="LogoSignIn" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                />
                <Input name="password" type="password" placeholder="senha" />

                <button type="submit">
                    {loading ? <FaSpinner size={20} color="#fff" /> : 'Acessar'}
                </button>
                <Link to="/register">Criar conta gratuita</Link>
            </Form>
        </>
    );
}
