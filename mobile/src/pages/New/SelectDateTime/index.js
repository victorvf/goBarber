import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation: { navigate }, route }) {
    const [date, setDate] = useState(new Date());
    const provider = route.params.item;

    // eslint-disable-next-line no-unused-vars
    const [availables, _] = useState(async () => {
        const response = await api.get(`/providers/${provider.id}/available`, {
            params: {
                date: date.getTime(),
            },
        });

        const { data } = response;

        return data || [];
    });

    const handleSelectHour = useCallback(
        async (time) => {
            navigate('Confirm', {
                provider,
                time,
            });
        },
        [navigate, provider]
    );

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HourList
                    data={availables}
                    keyExtractor={(available) => available.time}
                    renderItem={({ item }) => (
                        <Hour
                            onPress={() => handleSelectHour(item.value)}
                            enabled={item.available}
                        >
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation: { goBack } }) => ({
    title: 'Selecione o horário',
    headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
            <Icon name="chevron-left" size={23} color="#fff" />
        </TouchableOpacity>
    ),
});
