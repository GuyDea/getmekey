# Third-party algorithm implementations
There are two algorithms used in GetMeKey, that are not directly browser-supported:
- Scrypt
- Argon2 (deprecated due to a usage of binary file)

Libraries used in the production build of this project are imported directly into it's file structure, instead of relying on package-manager. 

As we are not using any bundler, it's just easier to fix import issues manually.
## Argon2
**Source:** https://github.com/antelle/argon2-browser

**Version:** 1.18.0

**GIT Hash:** d73916b8efad2ef47140a52acd48b166a4ba97bf

**Needed import fix:**
Change paths inside argon2.js (renamed to argon2-init.js) to reflect our folder structure

## Scrypt
**Source:** https://github.com/dchest/scrypt-async-js

**Version:** 2.0.1

**GIT Hash:** f0b3b674c4be7a81adc554a9972c03bfb28d4bed

**Needed import fix:** Added export to function

`export function scrypt(password, salt, logN, r, dkLen, interruptStep, callback, encoding) {`