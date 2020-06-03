import React from 'react'
import styled, { css } from 'styled-components'

import {
    MdVolumeUp, MdKeyboardArrowDown, MdSearch, MdMic, MdMoreVert, MdViewQuilt, MdCallEnd, MdMicOff, MdVideocam,
} from 'react-icons/md'
import { FaHashtag } from 'react-icons/fa'

export const CallPanel = props => (
    <StyledCallPanel>
        <CallBar className="callbar">
            <Row style={{ alignItems: 'center' }}>
                <MdVolumeUp style={{ fontSize: 25, marginRight: 5 }} color="var(--color-darkgray)" />
                <span style={{ fontSize: 14, fontWeight: 600 }}>
                    {props.channelName}
                </span>
            </Row>
            <MdViewQuilt style={{ fontSize: 28 }} />
        </CallBar>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {props.children}
        </div>
        <CallBar className="callbar" center>
            <RoundButton
                icon={MdVideocam}
                color="var(--color-dark3)"
                iconColor="#FFF"
            />
            <RoundButton
                icon={MdMicOff}
                color="#FFF"
            />
            <RoundButton
                icon={MdCallEnd}
                color="red"
                iconColor="#FFF"
            />
        </CallBar>
    </StyledCallPanel>
)

const RoundButton = ({ icon: Icon, ...props }) => (
    <StyledRoundButton {...props}>
        <Icon />
    </StyledRoundButton>
)

const StyledRoundButton = styled.div`
    border-radius: 999px;
    width: 60px;
    height: 60px;
    background-color: ${props => props.color || '#FFF'};
    margin: 0 12px;

    svg {
        color: ${props => props.iconColor || '#000'};
        font-size: 25px;
    }

    display: flex;
    align-items: center;
    justify-content: center;
`

const CallBar = styled.div`
    opacity: 0;
    transition: opacity .2s ease-in-out;

    padding: 21px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: ${props => props.center ? 'center' : 'space-between'};

    color: #FFF;
`

const StyledCallPanel = styled.div`
    flex: 10;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    :hover {
        .callbar {
            opacity: 1;
        }
    }
`

export const UserConfigs = props => (
    <StyledUserConfigs>
        <Avatar online />
        <div className="user-info">
            <span className="username">llbarbosas</span>
            <span className="id">>216435465131</span>
        </div>

        <MdMic />
        <MdVolumeUp />
        <MdMoreVert />
    </StyledUserConfigs>
)

const StyledUserConfigs = styled.div`
    margin-top: auto;
    box-sizing: border-box;
    padding: 12px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFF;
    width: 100%;
    background-color: var(--color-dark4);

    .user-info {
        margin-left: -7px;
    }

    .username {
        display: block;
        font-size: 12px;
        margin-bottom: -3px;
        font-weight: 600;
    }

    .id {
        font-size: 10px;
        color: var(--color-gray);
    }

    svg {
        color: var(--color-gray);
        font-size: 18px;
    }
`

export const Sender = styled.div`
    margin-bottom: 2px;

    .name {
        color: #FFF;
        margin-right: 10px;
        font-size: 15px; 
        font-weight: 500;
    }

    .date {
        color: var(--color-darkgray); 
        font-size: 12px;
    }
`

export const Message = props => (
    <StyledMessage style={{ marginTop: props.first ? 12 : 0 }}>
        <div style={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
            {props.first ?
                <Avatar /> :
                <span className="time">{props.time}</span>
            }
        </div>
        <div style={{ flex: 10 }}>
            <Sender style={{ display: props.first ? 'block' : 'none' }}>
                <span className="name">{props.name}</span>
                <span className="date">{props.date}</span>
            </Sender>
            <span>{props.text}</span>
        </div>
    </StyledMessage>
)

const StyledMessage = styled.div`
    display: flex;

    padding: 3px 15px;
    color: var(--color-brightgray); 
    font-size: 14px;

    :hover {
        background-color: var(--color-dark2);

        .time {
            color: var(--color-darkgray); 
        }
    }

    .time {
        color: transparent; 
        font-size: 10px;
    }
`

export const Messages = styled.div`
    overflow-y: auto;
    height: 78%;
`

export const TextInput = styled.div`
    margin: 0 16px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
    padding: 12px;
    background-color: #454950;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    textarea {
        resize: none;
        outline: none;
        background-color: transparent;
        border: none;
        flex: 1;
        color: white;
        margin-right: 10px;
    }
`
export const Search = props => (
    <StyledSearch {...props}>
        {props.placeholder}
        <MdSearch />
    </StyledSearch>
)

const StyledSearch = styled.div`
    background-color: var(--color-darkest);
    width: 140px;
    height: 20px;

    font-size: 12px;
    color: var(--color-darkgray);

    svg {
        font-size: 18px;
    }

    display: flex;
    justify-content: space-between;
    padding: 3px 10px;
    border-radius: 4px;
    align-items: center;

    margin: 0 10px;
`

export const OnlineCircle = styled.div`
    display: ${props => props.online ? 'block' : 'none'};

    border-radius: 999px; 
    width: 10px;
    height: 10px; 
    background-color: var(--color-success); 
    border: solid 2.5px var(--color-dark3);
`

const AvatarStyled = styled.div`
    border-radius: 999px;
    width: 32px;
    height: 32px;
    background-color: var(--color-darkgray);
    margin-right: 10px;

    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`

export const Avatar = props => (
    <AvatarStyled {...props}>
        <OnlineCircle online={props.online} />
    </AvatarStyled>
)

export const Member = props => (
    <StyledMember {...props}>
        <Avatar online={props.online} />
        <span>{props.name}</span>
    </StyledMember>
)

const StyledMember = styled.div`
    cursor: pointer;
    color: var(--color-darkgray);
    width: 90%;
    margin: 5px;
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;

    opacity: ${props => props.online ? 1 : 0.2};

    align-items: center;
    display: flex;

    transition: background-color .1s ease-in-out;

    :hover {
        background-color: var(--color-dark1);
    }
`

export const Row = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

export const Chat = styled.div`
    flex: 10;

    display: flex;
    flex-direction: column;
`

export const MembersPanel = styled.div`
    background-color: var(--color-dark3);
    height: 100%;
    width: 20%;
    flex: 3;
    padding-top: 5px;
`

export const NavChannel = props => (
    <StyledNavChannel {...props}>
        {props.currentChannelType === 'text' ? <FaHashtag /> : <MdVolumeUp />}
        {props.currentChannelName}
    </StyledNavChannel>
)

const StyledNavChannel = styled.div`
    margin-left: 15px;
    color: #FFF;
    font-weight: 600;
    font-size: 15px;

    align-items: center;
    display: flex;

    svg {
        margin-right: 5px;
        font-size: 22px;
        color: #52565f;
    }
`

export const NavItems = styled.div`
    color: #FFF;
    font-size: 28px;
    margin-right: 15px;

    display: flex;
    align-items: center;
`

export const Channel = props => (
    <StyledChannel {...props}>
        {props.type === 'text' ? <FaHashtag /> : <MdVolumeUp />}
        {props.name}
    </StyledChannel>
)

const StyledChannel = styled.div`
    cursor: pointer;
    color: var(--color-brightgray);
    width: 85%;
    margin-bottom: 5px;
    padding: 8px 10px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;

    align-items: center;
    display: flex;

    transition: background-color .1s ease-in-out;

    background-color: ${props => props.selected ? 'var(--color-dark1)' : 'unset'};

    :hover {
        background-color: var(--color-dark1);
    }

    svg {
        margin-right: 5px;
        font-size: 20px;
        color: #52565f;
    }
`

export const ChannelsNavbar = props => (
    <StyledChannelsNavbar {...props}>
        <span>{props.currentServerName}</span>
        <MdKeyboardArrowDown />
    </StyledChannelsNavbar>
)

const StyledChannelsNavbar = styled.div`
    cursor: pointer;
    border-top-left-radius: 8px;
    width: 100%;
    height: 55px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
    margin-bottom: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    color: #FFF;

    transition: background-color .1s ease-in-out;

    :hover {
        background-color: var(--color-dark1);
    }

    span {
        margin-left: 15px;
    }

    svg {
        font-size: 25px;
        margin-right: 10px;
    }
`

export const Navbar = styled.div`
    border-top-left-radius: 8px;
    background-color: var(--color-dark1);
    width: 100%;
    height: 55px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ChannelsPanel = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ChatPanel = styled.div`
    flex: 10;
    background-color: var(--color-dark1);
`

export const ConcordLogo = styled.div`
    background: url(/logo.png) no-repeat;
    width: 80px;
    height: 30px;
    position: absolute;
    top: -1px;
    left: -1px;
    margin: 0;
    background-size: cover;
    background-position-y: center;
    filter: grayscale() drop-shadow(0px 0px 30px black);
`

const getInitials = name => name
    .split(' ')
    .map((word, i) => i < 2 ? word[0] : '')
    .join('')

export const Server = props => (
    <StyledServer {...props}>
        {!props.option ?
            getInitials(props.name) :
            props.optionIcon()
        }
    </StyledServer>
)

const ServerSelected = css`
    background-color: ${props => props.option ? 'var(--color-success)' : 'var(--color-primary)'};
    border-radius: 18px;
    color: #FFF;
`

export const StyledServer = styled.div`
    cursor: pointer;
    border-radius: 50px;
    width: 52px;
    height: 52px;
    background-color: var(--color-dark1);
    margin-bottom: 10px;
    
    color: ${props => props.option ? 'var(--color-success)' : '#FFF'};
    font-weight: 600;
    font-size: ${props => props.option ? '28px' : '18px'};
    text-transform: uppercase;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color .2s ease-in-out, border-radius .2s ease-in-out, color .2s ease-in-out;

    ${props => props.selected && ServerSelected}

    :hover {
        ${ServerSelected}
    }
`

export const FullPage = styled.div`
    overflow: hidden;
    height: 100%;
    background-color: var(--color-darkest);

    display: flex;
`

export const ServerList = styled.div`
    height: 100%;
    width: 80px;

    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const DashboardConainer = styled.div`
    border-top-left-radius: 8px;
    margin-top: 25px;
    width: 100%;
    background-color: var(--color-dark3);

    display: flex;
`