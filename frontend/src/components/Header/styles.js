import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
    height: 64px;
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        align-items: center;

        img {
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #eee;
        }

        a {
            font-weight: bold;
            color: #7159c1;
        }
    }

    aside {
        display: flex;
        align-items: center;
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #eee;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #333;
        }

        a {
            display: block;
            margin-top: 2px;
            font-size: 12px;
            color: #999;
        }
    }

    img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        box-shadow: 3px 3px 3px #eee;
    }
`;
