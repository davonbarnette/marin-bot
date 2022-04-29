import React from 'react';
import './App.scss';
import {AppShell} from "@mantine/core";
import {QueryClientProvider} from 'react-query';
import {queryClient} from "../settings";
import {Outlet} from "react-router-dom";
import AppHeader from "./App.header";
import AppNavbar from "./App.navbar";
import getAppTheme from "./App.shell.styles";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppShell padding="md" fixed navbar={<AppNavbar/>} header={<AppHeader/>} styles={getAppTheme}>
                <Outlet/>
            </AppShell>
        </QueryClientProvider>
    );
}

export default App;
