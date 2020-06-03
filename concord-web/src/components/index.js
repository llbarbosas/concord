import styled from 'styled-components'

export const FullPage = styled.div`
    height: 100%;
    background-color: ${props => props.color || 'var(--color-dark3)'};

    display: flex;
    justify-content: center;
    align-items: center;
`