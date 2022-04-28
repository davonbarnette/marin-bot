import React, {useState} from 'react';
import './App.scss';
import {AppShell, Group, Header, Navbar, useMantineColorScheme} from "@mantine/core";
import {QueryClientProvider} from 'react-query';
import {queryClient} from "../settings";
import MarinEyes from "../assets/marin_eyes_cropped.jpg"
import {Outlet} from "react-router-dom";
import {MainLinks} from "../components/common/Sidebar.links/Sidebar.links";
import UserNavbar from "../components/common/User.navbar/User.navbar";

class Logo extends React.Component<{ colorScheme: any }> {
    render() {
        return null;
    }
}

function App() {
    const {colorScheme} = useMantineColorScheme();
    const [opened, setOpened] = useState(false);
    return (
        <QueryClientProvider client={queryClient}>
            <AppShell
                padding="md"
                fixed
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                        <Navbar.Section grow mt="xs">
                            <MainLinks/>
                        </Navbar.Section>
                        <Navbar.Section>
                            <UserNavbar/>
                        </Navbar.Section>
                    </Navbar>
                }
                header={
                    <Header height={60}>
                        <Group sx={{height: '100%'}} px={20} position="apart">
                            <div className="title-logo">
                                <img className="logo" alt="Marin Bot" src={MarinEyes}/>
                            </div>
                            <Logo colorScheme={colorScheme}/>
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
                <Outlet/>

            </AppShell>
        </QueryClientProvider>
    );
}

export default App;
