import React from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

export const useAuth = () => React.useContext(AuthContext)

export function AuthProvider(props) {
    const [user, setUser] = React.useState(null)

    const isAuthenticated = !!user

    const login = async (email, password) => {
        try {
            const user = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/login',
                data: {
                    email,
                    password
                }
            })

            setUser(user)
        } catch (err) {
            const { data } = err.response

            if (data.error) throw data.error

            throw Error('Unknown error')
        }
    }

    const register = async (email, username, password) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/register',
                data: {
                    email,
                    username,
                    password
                }
            })
            console.log(response.data)
            return response.data
        } catch (err) {
            const { data } = err.response

            if (data.error) throw data.error

            throw Error('Unknown error')
        }
    }

    const logout = () => setUser(false)

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register, user }} {...props} />
    )
}