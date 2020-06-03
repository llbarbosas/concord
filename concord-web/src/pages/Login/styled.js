import React from 'react'
import styled, { css } from 'styled-components'

export const TermsBox = styled.div`
    color: var(--color-darkgray);
    font-size: 10px;

    a { 
        display: inline;
        font-size: 10px;
    }
`

export const ConcordLogo = styled.div`
z-index: 1;
background: url('/logo.png') no-repeat;
width: 160px;
height: 42px;
position: absolute;
top: 20px;
left: 20px;
margin: 0;
background-size: cover;
background-position-y: center;
filter: brightness(10) drop-shadow(0px 0px 30px black);
`

export const Illustration = styled.div`
z-index: 0;
background: url('/illustration.png') no-repeat;
width: 809px;
height: 650px;
position: fixed;
top: -10px;
left: -75px;
margin: 0;
background-size: cover;
`

export const Container = styled.div`
z-index: 2;

background-color: var(--color-dark1);

padding: 32px;
width: 500px;

color: #ffff;

display: flex;
flex-direction: column;
align-items: center;

border-radius: 5px;
box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);

h2 {
    font-weight: 600;
    font-size: 24px;
    margin: 12px;
}

span {
    font-size: 16px;
    color: var(--color-gray);
}
`

export const AuthBox = styled.div`
display: flex;
align-items: baseline;
padding-top: 10px;

span {
    color: #72767d;
    font-size: 14px;
    line-height: 16px;
    margin-right: 5px;
}
`

export const A = styled.a`
color: var(--color-primary);
text-decoration: none;
font-size: 14px;
font-weight: 500;
line-height: 16px;
display: block;
`

export const FullPage = styled.div`
height: 100%;
background-color: var(--color-dark3);

display: flex;
justify-content: center;
align-items: center;
`

export const Form = styled.form`
    width: 100%;
    margin-top: 20px;
`

export const InputWrapper = props => (
    <StyledInputWrapper {...props}>
        <Label>
            {props.label}
            <span className="error">
                {props.error && ` - ${props.error}`}
            </span>
        </Label>
        {props.children}
    </StyledInputWrapper>
)

const OnInputError = css`
    h5 {
        color: var(--color-warning);
    }

    input {
        border-color: var(--color-warning);
        outline: var(--color-warning);

        :hover {
            border-color: var(--color-warning);
        }

        :focus {
            border-color: var(--color-warning);
            outline: var(--color-warning);
        }
    }
`

const StyledInputWrapper = styled.div`
    margin-bottom: 20px;

    ${props => props.error && OnInputError}
`

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    height: 40px;
    font-size: 15px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    color: var(--color-brightgray);
    background-color: var(--text-input-bg);
    border: 1px solid var(--text-input-border);
    transition: border-color .2s ease-in-out;

    :hover {
        border-color: #000;
    }

    :focus {
        border-color: #7289da;
        outline: #7289da;
    }
`

const Label = styled.h5`
    color: var(--color-darkgray);
    margin: 0 0 8px 0;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    text-transform: uppercase;

    .error {
        color: var(--colors-warning);
        font-size: 10px;
        text-transform: none;
        font-style: italic;
    }
`

export const Button = styled.button`
background-color: var(--color-primary);
color: #fff;
transition: background-color .17s ease,color .17s ease;
width: 100%;
height: 45px;
border-radius: 3px;
border: none;
font-weight: 600;

:hover {
    background-color: #677bc4;
}

:focus {
    outline: none;
}
`