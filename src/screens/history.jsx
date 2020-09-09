import React from 'react';
import {
    MuiPickersUtilsProvider,
    DatePicker
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

function HistoryScreen() {
    return (
        <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"/>
            </MuiPickersUtilsProvider>
        </>
    )
}

export {
    HistoryScreen
};