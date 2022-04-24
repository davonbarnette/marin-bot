import React from 'react';
import './App.scss';
import PrintsSearch from "./containers/Prints.search/Prints.search";
import {AppShell, Group, Header, useMantineColorScheme} from "@mantine/core";
import {QueryClientProvider} from 'react-query';
import {queryClient} from "./settings";
import MarinEyes from "./assets/marin_eyes_cropped.jpg"

class Logo extends React.Component<{ colorScheme: any }> {
    render() {
        return null;
    }
}

function App() {
    const {colorScheme} = useMantineColorScheme();
    return (
        <QueryClientProvider client={queryClient}>
            <AppShell
                padding="md"
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
                <PrintsSearch/>
            </AppShell>
        </QueryClientProvider>
    );
}

export default App;
