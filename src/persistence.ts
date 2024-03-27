export const STORAGE_ADDRESS = {
    USER_PREFERENCES: 'USER_PREFERENCES',
    ENCRYPTED_SECRET: 'ENCRYPTED_SECRET'
} as const;
export type Address = keyof typeof STORAGE_ADDRESS;

export const COOKIE_NAME = {
    SECRET_SESSION_KEY: 'SECRET_SESSION_KEY',
    SECRET_DURATION_KEY: 'SECRET_DURATION_KEY'
} as const;
type CookieName = keyof typeof COOKIE_NAME;

export class Persistence {
    private static readonly VERSION = 1;
    private static readonly COOKIE_PATH = 'this_path_is_meant_to_prevent_cookie_to_actually_leave_the_browser';

    public static addToStorage<T>(address: Address, value: T){
        localStorage.setItem(`${this.VERSION}_${address}`, JSON.stringify(value));
    }

    public static getFromStorage<T>(address: Address): T | null{
        const val = localStorage.getItem(`${this.VERSION}_${address}`);
        return val ? JSON.parse(val) : null;
    }

    public static getFromCookie<T>(name: CookieName): T | null {
        let nameEQ = `${this.VERSION}_${name}=`;
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    public static addToCookie(name: CookieName, value: any, durationInSeconds?: number): void {
        let cookieValue = `${this.VERSION}_${name}=${encodeURIComponent(JSON.stringify(value))}; path=${(this.COOKIE_PATH)}`;

        if (durationInSeconds) {
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + durationInSeconds * 1000);
            cookieValue += `; expires=${expiryDate.toUTCString()}`;
        }

        document.cookie = cookieValue;
    }

}