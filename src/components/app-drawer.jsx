import React from 'react';
import {
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { Link } from 'react-router-dom';

function AppDrawer({ close }) {
    return (
        <List>
            <ListItem button component={Link} to='/' onClick={close}>
                <ListItemText
                    primary="דיווח" />
            </ListItem>
            <ListItem button component={Link} to='/history' onClick={close}>
                <ListItemText
                    primary="היסטוריית דיווחים" />
            </ListItem>
        </List>
    )
}

export {
    AppDrawer
};