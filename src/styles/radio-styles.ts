import {css} from "../helper-functions.js";

export const radioStyles = css`
    input[type=radio] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        opacity: 0;
        position: absolute;
    }

    input[type=radio] + label {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        padding-left: 35px; /* Space for the custom radio button */
        margin-right: 15px;
        height: 20px;
    }

    input[type=radio] + label::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: var(--color-1);
        box-shadow: var(--box-shadow-1);        
        border-radius: 100%;
    }

    input[type=radio] + label::after {
        content: '';
        transition: transform .5s;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: white;
        z-index: 1;
    }

    input[type=radio]:checked + label::after {
        transform: scale(.5);
    }

    input[type=radio] + label:hover::after {
        background-color: #eaeaea;
    }
`