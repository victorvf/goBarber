import React, { useState, useMemo, useCallback } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
    Container,
    Badge,
    Scroll,
    NotificationList,
    Notification,
} from './styles';

export default function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState(async () => {
        const response = await api.get('/notifications');

        const data = response.data.map((notification) => ({
            ...notification,
            timeDistance: formatDistance(
                parseISO(notification.createdAt),
                new Date(),
                { addSuffix: true, locale: pt }
            ),
        }));

        return data || [];
    });

    const hasUnread = useMemo(
        () =>
            !!notifications.find((notification) => notification.read === false),
        [notifications]
    );

    const handleVisible = useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    const handleMarkAsRead = useCallback(
        async (id) => {
            await api.put(`/notification/${id}/update`);

            setNotifications(
                notifications.map((notification) =>
                    notification._id === id
                        ? { ...notification, read: true }
                        : notification
                )
            );
        },
        [notifications]
    );

    return (
        <Container>
            <Badge onClick={handleVisible} hasUnread={hasUnread}>
                <MdNotifications size={20} color="#7159c1" />
            </Badge>

            <NotificationList visible={visible}>
                <Scroll>
                    {notifications.map((notification) => (
                        <Notification
                            key={notification._id}
                            unread={!notification.read}
                        >
                            <p>{notification.content}</p>
                            <time>{notification.timeDistance}</time>
                            {!notification.read && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleMarkAsRead(notification._id)
                                    }
                                >
                                    Marcar como lida
                                </button>
                            )}
                        </Notification>
                    ))}
                </Scroll>
            </NotificationList>
        </Container>
    );
}
