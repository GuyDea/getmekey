/*
Tag functions used to denote purpose of used template literal - behave the same as regular template literal
 */
export function html(strings: TemplateStringsArray, ...expressions: any[]): string {
    return _returnUnchanged(strings, expressions);
}

export function css(strings: TemplateStringsArray, ...expressions: any[]): string {
    return _returnUnchanged(strings, expressions);
}

function _returnUnchanged(strings: TemplateStringsArray, ...expressions: any[]): string {
    return strings.reduce((result, str, i) => {
        return result + (expressions[i] ?? '') + str;
    }, strings[0] ?? '');
}