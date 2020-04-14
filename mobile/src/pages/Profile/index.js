import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
    Container,
    Title,
    Form,
    FormInput,
    Separator,
    SubmitButton,
    LogoutButton,
} from './styles';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user.profile);
    const loading = useSelector((state) => state.user.loading);

    const emailRef = useRef();
    const passwordRef = useRef();
    const oldPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setPassword('');
        setOldPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        dispatch(
            updateProfileRequest({
                name,
                email,
                oldPassword,
                password,
                confirmPassword,
            })
        );
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu perfil</Title>

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu nome"
                        returnKeyType="next"
                        value={name}
                        onChangeText={setName}
                        onSubmitEditing={() => emailRef.current.focus()}
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        ref={emailRef}
                        returnKeyType="next"
                        value={email}
                        onChangeText={setEmail}
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha atual"
                        ref={oldPasswordRef}
                        returnKeyType="next"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha nova"
                        ref={passwordRef}
                        returnKeyType="next"
                        value={password}
                        onChangeText={setPassword}
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirme sua senha nova"
                        ref={confirmPasswordRef}
                        returnKeyType="send"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onSubmitEditing={handleLogout}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Atualizar perfil
                    </SubmitButton>

                    <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ color, size }) => (
        <Icon name="person" size={size} color={color} />
    ),
};
