import React, { useState } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SignIn } from '../redux/actions';
import styled, { keyframes } from 'styled-components';
import Axios from 'axios';

function LoginScreen() {
    const [code, setCode] = useState('');
    const dispatch = useDispatch();

    async function login() {
        await Axios.post('/login', {
            username: code
        });
        let request = await Axios('/user');
        console.log(request);
        dispatch(SignIn(request.data));
    }

    return (
        <>
            <LoginCard>
                <CardContent>
                <Typography variant="h5" component="h2">
                    הזן קוד כניסה
                </Typography>
                    <TextField
                        label="קוד כניסה"
                        value={code}
                        onChange={event => setCode(event.target.value)}
                        fullWidth />
                </CardContent>
                <CardActions>
                    <Button onClick={login}>היכנס</Button>
                </CardActions>
            </LoginCard>
        </>
    )
}

const Grow = keyframes`
    from {
        transform: scaleY(0);
        opacity: 0;
    }
    to {
        transform: scaleY(1);
        opacity: 1;
    }
`;

const LoginCard = styled(Card)`
    margin: 20px auto;
    width: auto;
    animation: ${Grow} 0.25s;
    @media only screen and (orientation: landscape) {
        max-width: 500px;
    }
`;

export {
    LoginScreen
};