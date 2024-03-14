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
        width: 20px; /* Match the checkbox size */
        height: 20px;
        background-color: white; /* Background color */
        box-shadow: var(--box-shadow-1);
        box-sizing: border-box;
        border: 0 solid var(--color-1);
        border-radius: 100%;
        transition: border-width .1s;
    }
    
    input[type=radio]:checked + label::before {
        border-width: 5px;
    }

    input[type=radio] + label:hover::before {
        background-color: #c9cbcd;
    }
    input[type=radio]:checked + label:hover::before {
        border-color: hsl(var(--color-1-hsl-val), 100%, 30%);
    }
`