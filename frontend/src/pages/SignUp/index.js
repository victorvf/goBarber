import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('A senha é obrigatória'),
});

export default function SignUp() {
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={logo} alt="LogoSignIn" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" type="text" placeholder="Nome completo" />
                <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                />
                <Input name="password" type="password" placeholder="Senha" />

                <button type="submit">
                    {loading ? (
                        <FaSpinner size={20} color="#fff" />
                    ) : (
                        'Criar conta'
                    )}
                </button>
                <Link to="/">Já tenho conta</Link>
            </Form>
        </>
    );
}
