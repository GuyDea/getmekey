import {css} from "../helper-functions.js";

export const checkboxStyles = css`
    input[type=checkbox] {
        appearance: none;
        background-color: #dfe1e4;
        border-radius: 72px;
        border-style: none;
        flex-shrink: 0;
        height: 20px;
        margin: 0;
        position: relative;
        width: 30px;
        box-shadow: var(--box-shadow-1);
        cursor: pointer;
    }

    input[type=checkbox]:focus-visible{
        outline: 1px solid var(--color-1);
    }

    input[type=checkbox]::before {
        bottom: -6px;
        content: "";
        left: -6px;
        position: absolute;
        right: -6px;
        top: -6px;
    }

    input[type=checkbox],
    input[type=checkbox]::after {
        transition: all 100ms ease-out;
    }

    input[type=checkbox]::after {
        background-color: #fff;
        border-radius: 50%;
        content: "";
        height: 14px;
        left: 3px;
        position: absolute;
        top: 3px;
        width: 14px;
    }

    input[type=checkbox] {
        cursor: default;
    }

    input[type=checkbox]:hover {
        background-color: #c9cbcd;
        transition-duration: 0s;
    }

    input[type=checkbox]:checked {
        background-color: hsl(var(--color-1-hue-val), 100%, 50%);
    }

    input[type=checkbox]:checked::after {
        background-color: #fff;
        left: 13px;
    }

    :focus:not(.focus-visible) {
        outline: 0;
    }

    input[type=checkbox]:checked:hover {
        background-color: hsl(var(--color-1-hue-val), 100%, 30%);
    }
    input[type=checkbox].danger:checked:hover {
        background-color: hsl(var(--color-danger-hue-val), 100%, 30%);
    }    
    input[type=checkbox].danger{        
        box-shadow: var(--box-shadow-danger);
    }
    input[type=checkbox].danger:checked {
        background-color: hsl(var(--color-danger-hue-val), 100%, 50%);
    }
`