import React from 'react';
import {
    ThemeProvider,
    createMuiTheme,
    StylesProvider,
    jssPreset
} from '@material-ui/core';
import { create } from 'jss';
import rtl from 'jss-rtl';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    direction: 'rtl',
});

function RTL({ children }) {
    return (
        // <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
                <div dir="rtl">
                    {children}
                </div>
            </StylesProvider>
        // </ThemeProvider>
    )
}

export {
    RTL
};