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

}