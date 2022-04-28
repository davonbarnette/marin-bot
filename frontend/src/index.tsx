import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {MantineProvider, ColorSchemeProvider} from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';
import {BrowserRouter} from "react-router-dom";
import AppRouting from "./app/App.routing";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ColorSchemeProvider colorScheme="dark" toggleColorScheme={() => null}>
            <MantineProvider theme={{
                colors: {
                    brand: [
                        "#FFFFFF",
                        "#FFFFFF",
                        "#DBCECF",
                        "#CEB5B7",
                        "#C49C9F",
                        "#BE8286",
                        "#BD666C",
                        "#C14750",
                        "#C22E39",
                        "#A1373F",
                    ]
                },
                primaryColor: "brand",
                colorScheme: "dark",
                fontFamily: "Open Sans"
            }}>
                <NotificationsProvider>
                    <AppRouting/>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
