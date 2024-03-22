export const ADDRESS = {
    UX: 'UX'
} as const;
type Address = keyof typeof ADDRESS;

export class Persistence {
    private static readonly VERSION = 1;

    private static setItem<T>(address: Address, value: T){
        localStorage.setItem(`${this.VERSION}_${address}`, JSON.stringify(value));
    }

    private static getItem<T>(address: Address): T | null{
        const val = localStorage.getItem(`${this.VERSION}_${address}`);
        return val ? JSON.parse(val) : null;
    }

    private static _getCookieValue<T>(name: string): T | null {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

}