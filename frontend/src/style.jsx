import styled from 'styled-components'

export const AddButton = styled.button `
    background: #98FB98;
    color: #000;
    height: 35px;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    font-size: 15px;

    &:hover {
        opacity: 0.8;
    }
`

export const Container = styled.div `
    background: #13442d;
    padding: 20px;
    border-radius: 10px;

    h1 {
    color: #fff;
    margin-bottom: 30px;
    }
`

export const ContainerForm = styled.div `
    background: #13442d;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;

    h1 {
        color: #fff;
    }

    input {
        height: 35px;
        border-radius: 5px;
        border: none;
        margin-left: 10px;
        outline: none;
        padding-left: 10px;
    }
`

export const Books = styled.div `
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background: #fff;
        border-radius: 5px;
        margin-top: 15px;
        padding: 0 10px;

        p {
            text-transform: capitalize;
            font-weight: bold;
        }
`

export const Title = styled.div `
    padding: 20px;
    border-radius: 10px;

    h1 {
    color: #fff;
    margin-bottom: 30px;
    }
`

export const TrashButton = styled.button `
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 25px;
`