import React, { useState } from 'react'

import {
    MdAdd, MdExplore, MdHelp, MdInsertEmoticon
} from 'react-icons/md'

import {
    FullPage, ConcordLogo, Server, ServerList,
    DashboardConainer, ChannelsPanel, ChannelsNavbar,
    Channel, ChatPanel, Navbar, NavChannel, NavItems,
    Search, Row, Chat, Messages, Message, TextInput,
    Member, MembersPanel, UserConfigs, CallPanel
} from './styled'

import * as moment from 'moment'

export default function Dashboard() {
    const [currentServer, setCurrentServer] = useState(0)
    const [currentChannel, setCurrentChannel] = useState(0)
    const [holdingShift, setHoldingShift] = useState(false)

    // <UserMedia style={{ width: '50%' }} />

    const servers = [
        {
            name: 'Hello World',
            channels: [
                {
                    name: 'geral',
                    type: 'text',
                    messages: [
                        {
                            user: 0,
                            date: new Date(),
                            text: 'é o seguinte rapaziada'
                        },
                        {
                            user: 0,
                            date: new Date(),
                            text: 'um combate x1'
                        },
                        {
                            user: 0,
                            date: new Date(),
                            text: 'dps 2x2'
                        },
                        {
                            user: 2,
                            date: new Date(),
                            text: 'Só vem parceiro'
                        }
                    ]
                },
                {
                    type: 'text',
                    name: 'random',
                    messages: []
                },
                {
                    type: 'call',
                    name: 'gameplay',
                    messages: [],
                    connectedUsers: [0, 1]
                }
            ],
            members: [
                { id: 0, name: 'Jorge', avatar: '', online: true },
                { id: 1, name: 'Lucas', avatar: '', online: true },
                { id: 2, name: 'Lucas', avatar: '', online: false },
                { id: 3, name: 'Carlos', avatar: '', online: false }
            ]
        },
        {
            name: 'My Channel',
            channels: [
                {
                    name: 'geral',
                    type: 'text',
                    messages: []
                },
            ],
            members: [
                { id: 0, name: 'Jorge', avatar: '', online: true },
            ]
        }
    ]

    const onMessageSend = e => {
        if (!holdingShift) {
            e.preventDefault()
            console.log(e.target.value)
            e.target.value = ''
        }
    }

    return (
        <FullPage color="">
            <ConcordLogo />

            <ServerList>
                {servers.map((server, i) => (
                    <Server
                        name={server.name}
                        selected={currentServer === i}
                        onClick={() => setCurrentServer(i)}
                        key={i}
                    />
                ))}

                <Server option optionIcon={MdAdd} />
                <Server option optionIcon={MdExplore} />
            </ServerList>

            <DashboardConainer>
                <ChannelsPanel>
                    <ChannelsNavbar currentServerName={servers[currentServer].name} />
                    {servers[currentServer].channels.map((channel, i) => (
                        <Channel
                            type={channel.type}
                            name={channel.name}
                            selected={currentChannel === i}
                            onClick={() => setCurrentChannel(i)}
                            key={i}
                        />
                    ))}
                    <UserConfigs />
                </ChannelsPanel>
                {servers[currentServer].channels[currentChannel].type === "text" ? (
                    <ChatPanel>
                        <Navbar>
                            <NavChannel
                                currentChannelName={servers[currentServer].channels[currentChannel].name}
                                currentChannelType={servers[currentServer].channels[currentChannel].type}
                            />
                            <NavItems>
                                <Search placeholder="Buscar" />
                                <MdHelp />
                            </NavItems>
                        </Navbar>
                        <Row>
                            <Chat>
                                <Messages>
                                    {servers[currentServer].channels[currentChannel].messages.map((message, i, arr) => (
                                        <Message
                                            first={!arr[i - 1] || arr[i - 1].user !== message.user}
                                            name={servers[currentServer].members.find(member => member.id === message.user).name}
                                            date={moment(message.date).format('DD/MM/YYYY')}
                                            time={moment(message.date).format('LT')}
                                            text={message.text}
                                            key={i}
                                        />
                                    ))}
                                </Messages>
                                <TextInput>
                                    <textarea
                                        placeholder="Conversar em #geral"
                                        onKeyDown={e => {
                                            if (e.keyCode === 13)
                                                onMessageSend(e)
                                            else if (e.keyCode === 16) {
                                                setHoldingShift(true)
                                            }
                                        }}
                                        onKeyUp={e => e.keyCode === 16 && setHoldingShift(false)}
                                    />
                                    <NavItems>
                                        <MdInsertEmoticon />
                                    </NavItems>
                                </TextInput>
                            </Chat>

                            <MembersPanel>
                                {servers[currentServer].members.map((member, i) => (
                                    <Member
                                        online={member.online}
                                        avatar={member.avatar}
                                        name={member.name}
                                        key={i}
                                    />
                                ))}
                            </MembersPanel>
                        </Row>
                    </ChatPanel>
                ) : (
                        <CallPanel
                            channelName={servers[currentServer].channels[currentChannel].name}
                        >

                        </CallPanel>
                    )
                }

            </DashboardConainer>
        </FullPage>
    )
}

