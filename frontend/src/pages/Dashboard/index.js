import React, { useState, useMemo, useCallback } from 'react';
import {
    format,
    subDays,
    addDays,
    setHours,
    setMinutes,
    setSeconds,
    setMilliseconds,
    isBefore,
    parseISO,
    isEqual,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import { Container, Content, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    // eslint-disable-next-line no-unused-vars
    const [schedule, _] = useState(async () => {
        const response = await api.get(`/schedules`, {
            params: { date },
        });

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const data = range.map((hour) => {
            const checkDate = setMilliseconds(
                setSeconds(setMinutes(setHours(date, hour), 0), 0),
                0
            );

            console.tron.log(checkDate);

            const compareDate = utcToZonedTime(checkDate, timezone);

            return {
                time: `${hour}:00`,
                past: isBefore(compareDate, new Date()),
                appointment: response.data.find((a) =>
                    isEqual(parseISO(a.date), compareDate)
                ),
            };
        });

        return data || [];
    });

    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    const handlePrevDay = useCallback(() => {
        setDate(subDays(date, 1));
    }, [date]);

    const handleNextDay = useCallback(() => {
        setDate(addDays(date, 1));
    }, [date]);

    return (
        <Container>
            <Content>
                <header>
                    <button type="button" onClick={handlePrevDay}>
                        <MdChevronLeft size={36} color="#fff" />
                    </button>
                    <strong>{dateFormatted}</strong>
                    <button type="button" onClick={handleNextDay}>
                        <MdChevronRight size={36} color="#fff" />
                    </button>
                </header>

                <ul>
                    {schedule.map((time) => (
                        <Time
                            key={time.time}
                            past={time.past}
                            available={!time.appointment}
                        >
                            <strong>{time.time}</strong>
                            <span>
                                {time.appointment
                                    ? time.appointment.user.name
                                    : 'Em aberto'}
                            </span>
                        </Time>
                    ))}
                </ul>
            </Content>
        </Container>
    );
}
