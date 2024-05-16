const KEY_ITERATIONS = 100000;
const KEY_LENGTH = 256;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

type EncryptedObject = {
    encrypted: string,
    iv: string,
    salt: string
}

async function deriveKey(passphrase: string, salt: ArrayBuffer): Promise<ArrayBuffer> {
    const passphraseKey = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(passphrase),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );

    return window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: KEY_ITERATIONS,
            hash: 'SHA-256',
        },
        passphraseKey,
        KEY_LENGTH
    );
}

async function xorKeys(key1: ArrayBuffer, key2: ArrayBuffer): Promise<ArrayBuffer> {
    const view1 = new Uint8Array(key1);
    const view2 = new Uint8Array(key2);
    const xor = new Uint8Array(view1.length);
    for (let i = 0; i < view1.length; i++) {
        xor[i] = view1[i] ^ view2[i];
    }
    return xor.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export async function encryptData<T>(secret: T, ...passphrases: string[]): Promise<string> {
    const salt =  window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    let lastKey: ArrayBuffer = await deriveKey(passphrases[0], salt);
    for (let i = 1; i < passphrases.length; i++) {
        const keyI = await deriveKey(passphrases[i], salt);
        lastKey = await xorKeys(lastKey, keyI);
    }

    const finalKey = await window.crypto.subtle.importKey(
        'raw',
        lastKey,
        { name: 'AES-CBC' },
        false,
        ['encrypt']
    );

    const encryptedSecret = await window.crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv },
        finalKey,
        encoder.encode(JSON.stringify(secret))
    );
    return arrayBufferToBase64(encoder.encode(JSON.stringify({ encrypted: arrayBufferToBase64(encryptedSecret), iv: arrayBufferToBase64(iv.buffer), salt: arrayBufferToBase64(salt.buffer) } as EncryptedObject)));
}

export async function decryptData<T>(encryptedData: string, ...passphrases: string[]): Promise<T> {
    let data = JSON.parse(decoder.decode(base64ToArrayBuffer(encryptedData))) as EncryptedObject;
    const salt =  base64ToArrayBuffer(data.salt);
    const iv = base64ToArrayBuffer(data.iv) ;
    let lastKey: ArrayBuffer = await deriveKey(passphrases[0], salt);
    for (let i = 1; i < passphrases.length; i++) {
        const keyI = await deriveKey(passphrases[i], salt);
        lastKey = await xorKeys(lastKey, keyI);
    }

    const finalKey = await window.crypto.subtle.importKey(
        'raw',
        lastKey,
        { name: 'AES-CBC' },
        false,
        ['decrypt']
    );

    const decryptedSecret = await window.crypto.subtle.decrypt(
        {name: 'AES-CBC', iv: iv},
        finalKey,
        base64ToArrayBuffer(data.encrypted)
    );
    return JSON.parse(decoder.decode(decryptedSecret)) as T;
}

export function generateRandomPassphrase(length: number){
    return arrayBufferToBase64(window.crypto.getRandomValues(new Uint8Array(length)));
}
