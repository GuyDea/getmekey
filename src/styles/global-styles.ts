import {css} from "../helper-functions.js";

export const globalStyles = css`
    .iconButton {
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        transition: transform .5s;
    }

    .iconButton:hover{
        transform: scale(1.2);
    }

    .questionMarkIcon{
        display: block;
        height: 2rem;
        width: 2rem;
        transition: transform .5s;
        cursor: pointer;
    }

    .questionMarkIcon:hover {
        transform: scale(1.2);
    }


`