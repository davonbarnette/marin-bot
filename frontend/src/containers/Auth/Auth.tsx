import {AppShell, Center} from "@mantine/core";
import {Outlet} from "react-router-dom";
import React from "react";
import AppHeader from "../../app/App.header";
import getAppTheme from "../../app/App.shell.styles";

function Auth() {

    return (
        <AppShell padding="md" fixed header={<AppHeader/>} styles={getAppTheme}>
            <Center>
                <Outlet/>
            </Center>
        </AppShell>

    )

}

export default Auth;