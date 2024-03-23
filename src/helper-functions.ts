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

export const isPowerOfTwo = (n: number) => n > 0 && (n & (n - 1)) === 0;
export function highestPowerOfTwoLessThanN(n: number) {
    // Special case for numbers less than or equal to 1
    if (n <= 1) {
        return 0;
    }
    // Subtract 1 to ensure we find a power of 2 less than n
    n--;
    // Set all bits after the highest set bit
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16; // This line is enough for 32-bit integers
    // Right shift by 1 gives the largest power of 2 less than the original n
    return n - (n >> 1);
}

export function nextPowerOfTwo(n: number) {
    if (n <= 0) {
        return 1; // The next power of two for non-positive numbers is 1
    }
    // Check if n is already a power of two
    if ((n & (n - 1)) === 0) {
        return n;
    }
    // Set all bits after the highest set bit
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16; // This line is enough for 32-bit integers

    // For 64-bit integers, uncomment the following line:
    // n |= n >> 32;

    // Add one to change all trailing 1s to 0 and add a 1 at the next position
    return n + 1;
}