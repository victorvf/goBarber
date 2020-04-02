import styled, { css, keyframes } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto 0px;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        span {
            color: rgba(255, 35, 35, 0.6);
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            border: 0;
            border-radius: 4px;
            background: #3b9eff;
            font-weight: bold;
            color: #fff;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#3b9eff')};
            }

            ${(props) =>
                props.loading &&
                css`
                    svg {
                        animation: ${rotate} 2s linear infinite;
                    }
                `}
        }

        hr {
            border: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.3);
            margin: 10px 0 20px;
        }
    }

    > button {
        width: 100%;
        margin: 15px 0 0;
        height: 44px;
        border: 0;
        border-radius: 4px;
        background: #f64c75;
        font-weight: bold;
        color: #fff;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
            background: ${darken(0.05, '#f64c75')};
        }
    }
`;
