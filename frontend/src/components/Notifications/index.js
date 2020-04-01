import React from 'react';
import { MdNotifications } from 'react-icons/md';

import {
    Container,
    Badge,
    Scroll,
    NotificationList,
    Notification,
} from './styles';

export default function Notifications() {
    return (
        <Container>
            <Badge hasUnread>
                <MdNotifications size={20} color="#7159c1" />
            </Badge>

            <NotificationList>
                <Scroll>
                    <Notification unread>
                        <p>Você possui um novo agendamento para amanhã</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Você possui um novo agendamento para amanhã</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Você possui um novo agendamento para amanhã</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Você possui um novo agendamento para amanhã</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Você possui um novo agendamento para amanhã</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Você possui um novo agendamento para amanhã</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                </Scroll>
            </NotificationList>
        </Container>
    );
}
