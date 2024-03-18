function generateMask(length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * 256));
        result += randomChar;
    }
    return result;
}

function xorStrings(string1: string, string2: string) {
    let result = '';
    for (let i = 0; i < string1.length; i++) {
        // XOR the character codes to get a new character
        const charCode = string1.charCodeAt(i) ^ string2.charCodeAt(i);
        result += String.fromCharCode(charCode);
    }
    return result;
}

// Example usage
const secret = "This is a secret!";
const mask = generateMask(secret.length);
const encoded = xorStrings(secret, mask);

// Now, `mask` and `encoded` are the two strings that need to be combined to recover the secret.
const recovered = xorStrings(encoded, mask);

console.log({ mask, encoded, recovered });
