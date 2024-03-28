export const STORAGE_ADDRESS = {
    USER_PREFERENCES: 'USER_PREFERENCES',
    ENCRYPTED_SECRET: 'ENCRYPTED_SECRET'
} as const;
export type Address = keyof typeof STORAGE_ADDRESS;

export const COOKIE_NAME = {
    SESSION_KEY: 'SESSION_KEY',
    DURATION_KEY: 'DURATION_KEY'
} as const;
type CookieName = keyof typeof COOKIE_NAME;

export class Persistence {
    private static readonly VERSION = 1;

    public static addToStorage<T>(address: Address, value: T){
        localStorage.setItem(`${this.VERSION}_${address}`, JSON.stringify(value));
    }

    public static getFromStorage<T>(address: Address): T | null{
        const val = localStorage.getItem(`${this.VERSION}_${address}`);
        return val ? JSON.parse(val) : null;
    }

    public static removeFromStorage(address: Address){
        localStorage.removeItem(`${this.VERSION}_${address}`)
    }

    public static getFromCookie<T>(name: CookieName): T | null {
        let nameEQ = `${this.VERSION}_${name}=`;
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
        }
        return null;
    }

    public static addToCookie(name: CookieName, value: any, expiryDate?: Date): void {
        let cookieValue = `${this.VERSION}_${name}=${encodeURIComponent(JSON.stringify(value))}; path=/`;

        if (expiryDate) {
            cookieValue += `; expires=${expiryDate.toUTCString()}`;
        }
        document.cookie = cookieValue;
    }

    public static deleteAllCookies() {
        document.cookie.split(';').forEach(function(c) {
            document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        });
    }

}