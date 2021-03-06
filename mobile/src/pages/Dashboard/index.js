import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const isFocused = useIsFocused();

    const loadAppointments = useCallback(async () => {
        const response = await api.get('/appointments');

        setAppointments(response.data);
    }, []);

    useEffect(() => {
        if (isFocused) {
            loadAppointments();
        }
    }, [isFocused, loadAppointments]);

    const handleCancel = useCallback(
        async (id) => {
            const response = await api.delete(`/appointment/${id}/delete`);

            setAppointments(
                appointments.map((appointment) =>
                    appointment.id === id
                        ? {
                              ...appointment,
                              canceled_at: response.data.canceled_at,
                          }
                        : appointment
                )
            );
        },
        [appointments]
    );

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>

                <List
                    data={appointments}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Appointment
                            onCancel={() => handleCancel(item.id)}
                            data={item}
                        />
                    )}
                />
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Agendamento',
    tabBarIcon: ({ color, size }) => (
        <Icon name="event" size={size} color={color} />
    ),
};
