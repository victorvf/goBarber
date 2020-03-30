import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

export default function SignUp() {
    function handleSubmit(data) {
        console.tron.log(data);
    }

    return (
        <>
            <img src={logo} alt="LogoSignIn" />

            <Form onSubmit={handleSubmit}>
                <Input name="name" type="text" placeholder="Nome completo" />
                <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                />
                <Input name="password" type="password" placeholder="Senha" />

                <button type="submit">Criar conta</button>
                <Link to="/">Já tenho conta</Link>
            </Form>
        </>
    );
}
