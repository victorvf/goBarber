import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation: { reset }, route }) {
    const { provider, time } = route.params;

    const dateFormatted = useMemo(
        () => formatRelative(parseISO(time), new Date(), { locale: pt }),
        [time]
    );

    async function handleAddAppointment() {
        await api.post('/appointment/create', {
            date: time,
            provider_id: provider.id,
        });

        reset({
            routes: [{ name: 'Dashboard' }],
        });
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: provider.avatar
                            ? provider.avatar.url
                            : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                    }}
                />
                <Name>{provider.name}</Name>
                <Time>{dateFormatted}</Time>

                <SubmitButton onPress={handleAddAppointment}>
                    Confirmar agendamento
                </SubmitButton>
            </Container>
        </Background>
    );
}

Confirm.navigationOptions = ({ navigation: { goBack } }) => ({
    title: 'Confirmar agendamento',
    headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
            <Icon name="chevron-left" size={23} color="#fff" />
        </TouchableOpacity>
    ),
});
