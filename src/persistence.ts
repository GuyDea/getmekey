enum Address {
    PIN_ADDRESS = 'PIN_ADDRESS',
    PREFIX = 'PREFIX'
}

export class Persistence {
    private static readonly VERSION = 1;

    public static setPrefixPin(enabled: boolean){
        this.setItem(Address.PIN_ADDRESS, enabled ? '1' : '0');
    }

    public static getPrefixPin(){
        return this.getItem(Address.PIN_ADDRESS) === '1';
    }

    public static getPrefix(){
        return this.getItem(Address.PREFIX) ?? '';
    }

    public static setPrefixValue(value: string) {
        this.setItem(Address.PREFIX, value);
    }

    private static setItem(address: Address, value: string){
        localStorage.setItem(`${this.VERSION}_${address}`, value);
    }

    private static getItem(address: string){
        return localStorage.getItem(`${this.VERSION}_${address}`);
    }

}