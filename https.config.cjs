const fs = require("fs");

const certPath = __dirname + "/.cert/cert.pem";
const keyPath = __dirname + "/.cert/key.pem";

try {
    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);
    module.exports = {
        cert: cert,
        key: key
    };
}catch (e){
    throw `Could not fine cert or key files at
     Cert path: ${certPath}
     Key path: ${keyPath}`;
}