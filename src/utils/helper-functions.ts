/*
Tag functions used to denote purpose of used template literal - behave the same as regular template literal
 */
export function html(strings: TemplateStringsArray, ...expressions: any[]): string {
    return _returnUnchanged(strings, ...expressions);
}

export function css(strings: TemplateStringsArray, ...expressions: any[]): string {
    return _returnUnchanged(strings, ...expressions);
}

function _returnUnchanged(strings: TemplateStringsArray, ...expressions: any[]): string {
    return strings.reduce((result, str, i) => result + str + (expressions[i] ?? ''), '');
}

/**
 * @param selector
 * @param parent
 * @return function returning component within the parent for given selector
 */
export function comp<T extends HTMLElement | SVGElement>(parent: HTMLElement, selector: string): () => T {
    return () => parent.shadowRoot?.querySelector(selector) as T;
}

export function fixVal(min: number, max: number, inputComponent: HTMLInputElement, validateFn?: (number: number) => boolean, replaceInvalidFn?: (number: number) => number): number {
    let number = Number(inputComponent.value);
    number = Number.isNaN(number) ? min : number;
    let corrected = Math.min(Math.max(number, min), max);
    if(validateFn && !validateFn?.(corrected)){
        corrected = replaceInvalidFn?.(corrected) ?? corrected;
    }
    inputComponent.value = corrected.toString();
    return corrected
}

type AnyElement = Element;

function setAttr(el: AnyElement, name: string, value?: string) {
    el.setAttribute(name, value ?? '');
}
function rmAttr(el: AnyElement, name: string){
    el.removeAttribute(name);
}
export function setAttrIfTrue(set: boolean, el: AnyElement, name: string, valueIfTrue?: string, valueIfFalse?: string){
    set ? setAttr(el, name, valueIfTrue) : valueIfFalse ? setAttr(el, name, valueIfFalse) : rmAttr(el, name);
}

function setClass(el: AnyElement, name: string){
    el.classList.add(name);
}
function rmClass(el: AnyElement, name: string){
    el.classList.remove(name);
}
export function setClassIfTrue(set: boolean, el: AnyElement, name: string){
    set ? setClass(el, name) : rmClass(el, name);
}

export function toggleDisabledPanel(element: AnyElement, disable: boolean) {
    element.classList.add('disableable');
    setClassIfTrue(disable, element, 'disabled');
    setAttrIfTrue(disable, element, 'disabled');
    element.querySelectorAll('input, button, a').forEach(input => setAttrIfTrue(disable, input, 'disabled'));
}

export function toggleHiddenPanel(element: AnyElement, hidden: boolean) {
    (element as any).style.display = hidden ? 'none' : '';
}

export function formatTime(milliseconds: number): string {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    const pad = (n: number) => n < 10 ? '0' + n : n;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function deepCopy<T>(originalObject: T): T{
    return structuredClone(originalObject) ?? JSON.parse(JSON.stringify(originalObject));
}

export function deepCompareEquals(object1: any, object2: any): boolean{
    return JSON.stringify(object1) === JSON.stringify(object2);
}
