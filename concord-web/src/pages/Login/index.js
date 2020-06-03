import React, { useState } from 'react'

import {
    Container, Form, InputWrapper, Input,
    A, Button, AuthBox, TermsBox, ConcordLogo,
    Illustration, FullPage
} from './styled'

import { useHistory, useLocation } from 'react-router-dom'

import { useAuth } from '../../providers/Auth'

export default function Login() {
    const { pathname } = useLocation()

    const route = pathname.slice(1) // login | register

    const [action, setAction] = useState(route)
    const [userData, setUserData] = useState({ email: '', username: '', password: '' })
    const [verifyLink, setVerifyLink] = useState('#')
    const [error, setError] = useState({})

    const history = useHistory()

    const auth = useAuth()

    const onRegister = async e => {
        e.preventDefault()

        try {
            const { link } = await auth.register(userData.email, userData.username, userData.password)
            console.log(link)
            setVerifyLink(link)
            setAction('verify')
        } catch (error) {
            const { email, password } = error

            if (!!email || !!password) {
                return setError({ email, password })
            } else {
                // TODO: show toast
                console.log(error)
            }
        }


    }

    const onLogin = async e => {
        e.preventDefault()

        setError({})

        try {
            const user = await auth.login(userData.email, userData.password)
            console.log(user)
            history.push('/dashboard')
        } catch (error) {
            const { email, password } = error

            if (!!email || !!password) {
                return setError({ email, password })
            } else {
                // TODO: show toast
                console.log(error)
            }
        }
    }

    const LoginContainer = (
        <Container>
            <h2>Boas-vindas de volta!</h2>
            <span>Estamos muito animados em te ver novamente!</span>
            <Form onSubmit={onLogin}>
                <InputWrapper label="E-mail" error={error.email}>
                    <Input
                        required
                        type="email"
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                    />
                </InputWrapper>
                <InputWrapper label="Senha" error={error.password}>
                    <Input
                        required
                        type="password"
                        value={userData.password}
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                    />
                    <A href="#" style={{ marginTop: 7 }}>Esqueceu sua senha?</A>
                </InputWrapper>

                <Button type="submit">Entrar</Button>
                <AuthBox>
                    <span>Precisando de uma conta?</span><A href="#" onClick={() => setAction('register')}>Registre-se</A>
                </AuthBox>
            </Form>
        </Container>
    )

    const RegisterContainer = (
        <Container style={{ width: 420 }}>
            <h2>Criar uma conta</h2>
            <Form onSubmit={onRegister}>
                <InputWrapper label="E-mail">
                    <Input
                        required
                        type="email"
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                    />
                </InputWrapper>
                <InputWrapper label="Nome de usuário">
                    <Input
                        required
                        type="text"
                        value={userData.username}
                        onChange={e => setUserData({ ...userData, username: e.target.value })}
                    />
                </InputWrapper>
                <InputWrapper label="Senha">
                    <Input
                        required
                        type="password"
                        value={userData.password}
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                    />
                </InputWrapper>

                <Button type="submit">Continuar</Button>
                <AuthBox>
                    <A href="#" onClick={() => setAction('login')}>Já tem uma conta?</A>
                </AuthBox>
                <TermsBox>
                    <p>Ao continuar, você concorda com os <A>termos de serviço</A> e a <A>política de privacidade</A> do Concord</p>
                </TermsBox>
            </Form>
        </Container>
    )

    const VerifyEmailContainer = (
        <Container style={{ width: 420 }}>
            <h2>Estamos quase lá!</h2>
            <span>Verifique seu e-mail para continuar</span>

            <TermsBox style={{ marginTop: 15 }}>
                <p>Enviamos um e-mail de confirmação para você. Não recebeu nada? <A>Reenviar e-mail</A></p>
                <p>
                    Na verdade, nós ainda não enviamos, porque o envio de e-mails ainda não foi implementado.
                    Você pode verificar seu e-mail através <A href={verifyLink}>deste link</A>
                </p>
            </TermsBox>
        </Container>
    )

    const actions = {
        login: LoginContainer,
        register: RegisterContainer,
        verify: VerifyEmailContainer
    }

    return (
        <FullPage>
            <ConcordLogo />
            <Illustration />
            {actions[action]}
        </FullPage >
    )
}
