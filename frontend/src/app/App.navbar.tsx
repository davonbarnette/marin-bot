import {Navbar} from "@mantine/core";
import {MainLinks} from "../components/common/Sidebar.links/Sidebar.links";
import UserNavbar from "../components/common/User.navbar/User.navbar";
import React from "react";

interface Props {
    opened?: boolean,
}

function AppNavbar({ opened }:Props) {
    return (
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
            <Navbar.Section grow mt="xs">
                <MainLinks/>
            </Navbar.Section>
            <Navbar.Section>
                <UserNavbar/>
            </Navbar.Section>
        </Navbar>
    )
}

export default AppNavbar;