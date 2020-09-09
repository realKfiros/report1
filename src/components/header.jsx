import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core';
import {
    ExitToApp, Menu
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { SignOut } from '../redux/actions';
import styled from 'styled-components';
import Axios from 'axios';

function Header({ openDrawer }) {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);

    function logout() {
        Axios.post('/logout').then(() => dispatch(SignOut()));
    }

    return user ? (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={openDrawer}>
                <Menu />
            </IconButton>
            <Title variant="h6">דוח 1</Title>
            <Typography variant="h6">שלום {user.name}</Typography>
            <IconButton onClick={logout}>
                <ExitToApp />
            </IconButton>
          </Toolbar>
        </AppBar>
    ) : (
        <AppBar position="static">
          <Toolbar>
            <Title edge="start" variant="h6">דוח 1</Title>
          </Toolbar>
        </AppBar>
    )
}

const Title = styled(Typography)`
    flex-grow: 1;
    text-align: right;
`;

export {
    Header
};