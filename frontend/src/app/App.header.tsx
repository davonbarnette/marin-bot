import {ActionIcon, Button, Group, Header, Tooltip} from "@mantine/core";
import MarinEyes from "../assets/marin_eyes_cropped.jpg";
import React from "react";
import {ReactComponent as Discord} from "../assets/discord.svg";
import {ReactComponent as GitHub} from "../assets/github.svg";
import {useNavigate} from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    return (
        <Header height={60}>
            <Group sx={{height: '100%'}} px={20} position="apart">
                <div className="title-logo" onClick={() => navigate("/")}>
                    <div className="jp">
                        マリンボット
                    </div>
                    <div className='marin-bot'>
                        Marin Bot
                    </div>
                </div>
                <Group spacing="xs">
                    <Tooltip label="Marin Server" withArrow>
                        <ActionIcon size="lg" color="blue" variant="default">
                            <Discord/>
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Source Code" withArrow>
                        <ActionIcon size="lg" color="gray"
                                    onClick={() => window.open("https://github.com/hitagidayo/marin-bot", "_blank")}
                                    variant="default">
                            <GitHub/>
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
        </Header>
    )
}

export default AppHeader;