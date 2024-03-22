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
export function comp<T>(parent: HTMLElement, selector: string): () => T {
    return () => parent.shadowRoot?.querySelector(selector) as T;
}

export function reDispatchEvent(originalEvent: any, newParent: HTMLElement) {
    // Create a new event of the same type as the original
    let clonedEvent = new originalEvent.constructor(originalEvent.type, {
        bubbles: true,
        composed: true,
        // Copy other relevant properties as needed
        cancelable: originalEvent.cancelable,
        detail: originalEvent.detail
    });

    // Dispatch the cloned event from the same target
    // newParent.dispatchEvent(clonedEvent);
}
