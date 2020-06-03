import React from 'react'
// import axios from 'axios'

const ChatContext = React.createContext()

export const useChat = () => React.useContext(ChatContext)

export function ChatProvider(props) {
    const [user, setUser] = React.useState(false)

    const isAuth = () => !!user

    const logout = () => setUser(false)

    return (
        <ChatContext.Provider value={{ isAuth, logout }} {...props} />
    )
}