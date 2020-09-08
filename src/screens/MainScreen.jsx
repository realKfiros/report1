import React, { useState, useEffect } from 'react';
import {
    Grid,
    ButtonBase,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Axios from 'axios';
import io from 'socket.io-client';

function MainScreen() {
    const [reply, setReply] = useState('');
    const socket = io('http://localhost:3001');

    const { user } = useSelector(store => store.user);

    useEffect(() => {
        componentDidMount();
    }, []);

    async function componentDidMount() {
        let request = await Axios('/replies/today', {
            params: {
                user: user.key
            }
        });
        if (request.data) {
            setReply(request.data.reply);
        }
    }

    async function performReply(_reply) {
        socket.emit('reply', {
            user: user.key,
            reply: _reply
        });
        setReply(_reply);
    }

    return (
        <Grid container spacing={1}>
            <ReplyButton reply="בבסיס" selected={reply === 'בבסיס'} onClick={() => performReply('בבסיס')}/>
            <ReplyButton reply="בתפקיד חוץ" selected={reply === 'בתפקיד חוץ'} onClick={() => performReply('בתפקיד חוץ')}/>
            <ReplyButton reply="ג" selected={reply === 'ג'} onClick={() => performReply('ג')}/>
            <ReplyButton reply="חופש" selected={reply === 'חופש'} onClick={() => performReply('חופש')}/>
        </Grid>
    )
}

function ReplyButton({ reply, selected, onClick }) {
    return (
        <Item item xs={6}>
            <Touchable onClick={onClick}>
                <ReplyCard style={{ backgroundColor: selected ? '#eeeeee' : '#ffffff' }}>
                    <CardContent>
                        <Typography variant="h4">{reply}</Typography>
                    </CardContent>
                </ReplyCard>
            </Touchable>
        </Item>
    )
}

const Touchable = styled(ButtonBase)`
    margin: 10px auto;
    flex: 1;
    @media only screen and (orientation: landscape) {
        width: calc(50% - 20px);
    }
    @media only screen and (orientation: portrait) {
        width: calc(100% - 20px);
    }
`;

const ReplyCard = styled(Card)`
    width: 100%;
`;

const Item = styled(Grid)`
    text-align: center;
    padding: 50px;
    @media only screen and (orientation: landscape) {
        height: calc(50vh - 52px);
    }
`;

export { MainScreen };