import {css} from "../helper-functions.js";

export const globalStyles = css`
    ${document.getElementById('scrollerStyles')!.innerHTML}
    ${document.getElementById('baseStyles')!.innerHTML}
    /* General styles */
    .verticalItems {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }    
    label, .label {
       margin-right: 10px; 
    }    
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
    .settingsColumn{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .line{
        display: flex;
        flex-direction: row;
        align-items: start;
        gap: .5rem;
        justify-content: start;
    }
    .lineCenter{
        align-items: center;
    }
    .lineRadios {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: .5rem;
    }
    label.danger, span.danger{
        color: var(--color-danger);
    }
    /* Checkbox styles */
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

    input[type=checkbox]:hover:not([disabled]) {
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

    input[type=checkbox]:checked:hover:not([disabled]) {
        background-color: hsl(var(--color-1-hue-val), 100%, 30%);
    }
    input[type=checkbox].danger:checked:hover:not([disabled]) {
        background-color: hsl(var(--color-danger-hue-val), 100%, 30%);
    }
    input[type=checkbox].danger{
        box-shadow: var(--box-shadow-danger);
    }
    input[type=checkbox].danger:checked {
        background-color: hsl(var(--color-danger-hue-val), 100%, 50%);
    }
    /* Radio input */
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
        padding-left: 25px;
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

    input[type=radio]:not([disabled]) + label:hover::after {
        background-color: #eaeaea;
    }
    /* Text input */
    input[type=text], input[type=number] {
        border-radius: var(--border-radius-1);
        text-align: center;
        padding: .5em .5em;
        border: none;
        box-shadow: var(--box-shadow-1);
        transition: box-shadow .3s, transform .3s;
        font-size: 12px;
        height: 2em;
        box-sizing: border-box;
    }
    input[type=text].short ,input[type=number].short {
        width: 5.5rem;
    }
    input[type=text]::placeholder, input[type=number]::placeholder {
        color: rgba(var(--color-text-1-hex-val), .6);
        font-size: 1rem;
    }
    input[type=text]:focus, input[type=number]:focus {
        outline: 2px solid var(--color-1);
        box-shadow: none;
        transform: scale(1) !important;
    }

    input[type=text]:hover:not([disabled]), input[type=number]:hover:not([disabled]) {
        transform: scale(1.05);
    }
    
    input[type=text].danger, input[type=number].danger {
        box-shadow: var(--box-shadow-danger);
        color: var(--color-danger)
    }
    input[type=text].danger:focus, input[type=number].danger:focus {
        outline: 2px solid var(--color-danger);
    }
    /* Range slider */
    input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        height: 5px;
        border-radius: 5px;
        background: hsla(var(--color-1-hue-val), 50%, 70%, 1);
        outline: none;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--color-1);
        cursor: pointer;
        box-shadow: var(--box-shadow-1);
    }

    input[type=range]::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--color-1);
        cursor: pointer;
        box-shadow: var(--box-shadow-1);
    }   
    input[type=range]:hover {
        opacity: 1; /* Fully shown on mouse-over */
    }
    input[type=range].danger{
        background: hsla(var(--color-danger-hue-val), 50%, 70%, 1);
        box-shadow: var(--box-shadow-danger);
    }
    input[type=range].danger::-webkit-slider-thumb {
        background: var(--color-danger);
    }
    input[type=range].danger::-moz-range-thumb {
        background: var(--color-danger);
    }
`

