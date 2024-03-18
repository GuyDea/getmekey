import { css } from "/src/helper-functions.js";

export const textInputStyles = css`
    input[type=text], input[type=number] {
        border-radius: var(--border-radius-1);
        text-align: center;
        padding: .5em .5em;
        border: none;
        box-shadow: var(--box-shadow-2);
        transition: box-shadow .3s, transform .3s;
        font-size: 12px;
        height: 2em;
        box-sizing: border-box;
    }
    input[type=text]::placeholder, input[type=number]::placeholder {
        color: rgba(var(--color-2-val), .6);
        font-size: 1rem;
    }
    input[type=text]:focus, input[type=number]:focus {
        outline: 2px solid var(--color-1);
        box-shadow: none;
        transform: scale(1) !important;
    }

    input[type=text]:hover, input[type=number]:hover {
        transform: scale(1.05);
    }
`