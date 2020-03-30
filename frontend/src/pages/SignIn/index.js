import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

export default function SignIn() {
    function handleSubmit(data) {
        console.tron.log(data);
    }

    return (
        <>
            <img src={logo} alt="LogoSignIn" />

            <Form onSubmit={handleSubmit}>
                <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                />
                <Input name="password" type="password" placeholder="senha" />

                <button type="submit">Acessar</button>
                <Link to="/register">Criar conta gratuita</Link>
            </Form>
        </>
    );
}
