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