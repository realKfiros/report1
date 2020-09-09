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
    const [replyTypes, setReplyTypes] = useState([]);
    const [reply, setReply] = useState('');
    const socket = io('http://localhost:3001');

    const { user } = useSelector(store => store.user);

    useEffect(() => {
        componentDidMount();
    }, []);

    async function componentDidMount() {
        await getReplyTypes();
        await getReplyToday();
    }

    async function getReplyTypes() {
        let request = await Axios('/replies/types', {
            params: {
                user: user.key
            }
        });
        if (request.data) {
            setReplyTypes(request.data);
        }
    }

    async function getReplyToday() {
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
            {replyTypes.map(type => <ReplyButton reply={type} selected={reply === type.reply} onClick={() => performReply(type.reply)}/>)}
        </Grid>
    )
}

function ReplyButton({ reply, selected, onClick }) {
    return (
        <Item item xs={6}>
            <Touchable onClick={onClick}>
                <ReplyCard style={{ backgroundColor: selected ? '#eeeeee' : '#ffffff' }}>
                    <CardContent>
                        <Typography variant="h4">{reply.reply}</Typography>
                    </CardContent>
                </ReplyCard>
            </Touchable>
        </Item>
    )
}

const Touchable = styled(ButtonBase)`
    margin: 10px auto;
    flex: 1;
    width: calc(100% - 20px);
`;

const ReplyCard = styled(Card)`
    width: 100%;
`;

const Item = styled(Grid)`
    text-align: center;
    padding: 50px;
`;

export { MainScreen };