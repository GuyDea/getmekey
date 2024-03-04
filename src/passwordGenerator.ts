async function sha256(inputText: string): Promise<string> {
    return Array.from(
        new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(inputText)))
    ).map(b => b.toString(16).padStart(2, '0')).join('');
}

export class PasswordGenerator {
    public static async generatePassword(secretAndApp: string, takeFirst: number, securityPrefix: string): Promise<string> {
        return `${securityPrefix}${(await sha256(secretAndApp)).substring(0, takeFirst)}`
    }
}