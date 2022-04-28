import {AppShell, Center, Group, Header, Navbar} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {MainLinks} from "../../components/common/Sidebar.links/Sidebar.links";
import UserNavbar from "../../components/common/User.navbar/User.navbar";
import MarinEyes from "../../assets/marin_eyes_cropped.jpg";
import React from "react";

function Auth() {

    return (
        <AppShell
            padding="md"
            fixed
            header={
                <Header height={60}>
                    <Group sx={{height: '100%'}} px={20} position="apart">
                        <div className="title-logo">
                            <img className="logo" alt="Marin Bot" src={MarinEyes}/>
                        </div>
                    </Group>
                </Header>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
        >
            <Center>
                <Outlet/>
            </Center>
        </AppShell>

    )

}

export default Auth;