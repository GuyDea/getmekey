export  class ByteUtils {
    public static uint8ArrayToBase64String(byteArray: Uint8Array) {
        let string = '';
        for (let i = 0; i < byteArray.byteLength; i++) {
            string += String.fromCharCode(byteArray[i]);
        }
        return btoa(string);
    }

    public static uint8ArrayToHexString(byteArray: Uint8Array) {
        let hexString = '';
        for (let i = 0; i < byteArray.byteLength; i++) {
            const hex = byteArray[i].toString(16).padStart(2, '0');
            hexString += hex;
        }
        return hexString;
    }
}