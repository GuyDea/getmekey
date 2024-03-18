enum Address {
    SALT = 'SALT'
}

export class Persistence {
    private static readonly VERSION = 1;

    public static getSalt(){
        return this.getItem(Address.SALT) ?? '';
    }

    public static setSaltValue(value: string) {
        this.setItem(Address.SALT, value);
    }

    private static setItem(address: Address, value: string){
        localStorage.setItem(`${this.VERSION}_${address}`, value);
    }

    private static getItem(address: string){
        return localStorage.getItem(`${this.VERSION}_${address}`);
    }

    private static _getCookieValue(name: string): string | null {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

}